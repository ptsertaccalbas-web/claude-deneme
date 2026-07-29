const fs = require("fs")
const path = require("path")

const src = path.join(__dirname, "..", "packages", "shared")
const dest = path.join(__dirname, "components", "shared")

if (!fs.existsSync(src)) {
  console.log("shared package not found, assuming files already in place")
  process.exit(0)
}

if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })

const files = fs.readdirSync(src).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"))
for (const f of files) {
  fs.copyFileSync(path.join(src, f), path.join(dest, f))
}
console.log("shared synced")
