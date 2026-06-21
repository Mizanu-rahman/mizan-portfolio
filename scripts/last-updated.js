const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

try {
  const date = execSync("git log -1 --format=%ci").toString().trim();
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  fs.writeFileSync(
    path.join(__dirname, "..", "public", "last-updated.json"),
    JSON.stringify({ updated: formatted }),
  );
} catch (error) {
  const formatted = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  fs.writeFileSync(
    path.join(__dirname, "..", "public", "last-updated.json"),
    JSON.stringify({ updated: formatted }),
  );
}
