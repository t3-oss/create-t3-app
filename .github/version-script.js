// ORIGINALLY FROM CLOUDFLARE WRANGLER:
// https://github.com/cloudflare/wrangler2/blob/main/.github/version-script.js
const fs = require("fs");
const { exec } = require("child_process");

try {
  const pkg = JSON.parse(fs.readFileSync("package.json"));
  exec("git rev-parse --short HEAD", (err, stdout) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    // Version has to supersede the currently available version
    pkg.version = "5.5.0-" + stdout.trim();
    fs.writeFileSync("package.json", JSON.stringify(pkg, null, "\t") + "\n");
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
