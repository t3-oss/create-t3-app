// ORIGINALLY FROM CLOUDFLARE WRANGLER:
// https://github.com/cloudflare/wrangler2/blob/main/.github/version-script.js
import fs from "fs";
import { exec } from "child_process";

try {
  const pkg = JSON.parse(fs.readFileSync("package.json"));
  exec("git rev-parse --short HEAD", (err, stdout) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    pkg.version = "6.0.0-next." + stdout.trim();
    fs.writeFileSync("package.json", JSON.stringify(pkg, null, "\t") + "\n");
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
