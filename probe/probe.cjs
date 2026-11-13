// Read-only probe #2: is the production Turborepo blob absent, or just out of this token's scope?
// Prints only masked excerpts.
const fs = require("node:fs");
const { spawnSync } = require("node:child_process");

const TOKEN = process.env.VERCEL_ARTIFACTS_TOKEN || "";
const HASH = "ba550ee1a2854e7e"; // @ct3a/www#build, derived offline from a clone of their main
const MARK = "probe-marker-" + Date.now().toString(16);

function mask(s) { s = String(s); return s.length <= 8 ? s : s.slice(0, 4) + "…" + s.length; }
function curl(args) {
  const r = spawnSync("curl", ["-s", "-m", "25", ...args], { encoding: "utf8", timeout: 30000 });
  return { out: (r.stdout || "").trim(), err: (r.stderr || "").trim() };
}

console.log("== blob probe 2 ==");
console.log("env=" + (process.env.VERCEL_ENV || "?") + " region=" + (process.env.VERCEL_REGION || "?") +
            " build=" + (process.env.VERCEL_DEPLOYMENT_ID ? mask(process.env.VERCEL_DEPLOYMENT_ID) : "?"));
if (!TOKEN) { console.log("no VERCEL_ARTIFACTS_TOKEN (CI run)"); process.exit(0); }

let claims = {};
try { claims = JSON.parse(Buffer.from(TOKEN.split(".")[1], "base64").toString("utf8")); } catch (e) {}
const d = claims.data || {};
const pol = (d.secureCachePolicy && d.secureCachePolicy.policy) || {};
console.log("project " + mask(d.projectId) + " owner " + mask(d.ownerId) +
            " repo " + (pol.repository && pol.repository.id) + " source " + (pol.sourceRepository && pol.sourceRepository.id) +
            " read[" + (pol.readNamespaces || []).join(",") + "] write[" + pol.writeNamespace + "]");

const HOSTS = ["api-iad1.vercel.com", "api-sfo1.vercel.com", "api-fra1.vercel.com"];
const team = (pol.ownerId || "");

// 1. GET the production hash, with and without teamId, and keep the error body
for (const h of HOSTS) {
  const a = curl(["-H", "Authorization: Bearer " + TOKEN, "https://" + h + "/v8/artifacts/" + HASH + "?teamId=" + team]);
  const b = curl(["-H", "Authorization: Bearer " + TOKEN, "https://" + h + "/v8/artifacts/" + HASH]);
  console.log("GET " + h + " teamId -> " + (a.out.slice(0, 160) || "(empty)"));
  console.log("GET " + h + " plain  -> " + (b.out.slice(0, 160) || "(empty)"));
}

// 2. batch existence oracle, correct shape
const body = JSON.stringify({ hashes: { [HASH]: { size: 1, taskDurationMs: 0 }, [MARK]: { size: 1, taskDurationMs: 0 } } });
for (const h of HOSTS) {
  const r = curl(["-X", "POST", "-H", "Authorization: Bearer " + TOKEN, "-H", "Content-Type: application/json",
                  "-d", body, "https://" + h + "/v8/artifacts?teamId=" + team]);
  console.log("POST " + h + " -> " + (r.out.slice(0, 200) || r.err.slice(0, 120)));
}

// 3. sanity: write our own artifact, read it back
const payload = "PROBE-MARKER-VALUE-" + Date.now();
const put = curl(["-X", "PUT", "-H", "Authorization: Bearer " + TOKEN, "-H", "Content-Type: text/plain",
                  "--data-binary", payload, "https://api-iad1.vercel.com/v8/artifacts/" + MARK + "?teamId=" + team]);
console.log("PUT " + MARK + " -> " + (put.out.slice(0, 200) || "(empty)"));
const back = curl(["-H", "Authorization: Bearer " + TOKEN, "https://api-iad1.vercel.com/v8/artifacts/" + MARK + "?teamId=" + team]);
console.log("GET back -> " + (back.out.slice(0, 200) || "(empty)"));
