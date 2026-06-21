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
  const data = { updated: formatted };
  fs.writeFileSync(
    path.join(__dirname, "..", "public", "last-updated.json"),
    JSON.stringify(data),
  );
  console.log("Last updated timestamp generated:", formatted);
} catch (error) {
  // Fallback – use current date
  const formatted = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const data = { updated: formatted };
  fs.writeFileSync(
    path.join(__dirname, "..", "public", "last-updated.json"),
    JSON.stringify(data),
  );
  console.log("Fallback timestamp generated:", formatted);
}
