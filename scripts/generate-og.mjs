// Rasterises public/og-cover.svg to a 1200x630 PNG for social cards.
// Run with `npm run og`. Uses the bundled sharp/librsvg — no external service.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const input = path.join(root, "public", "og-cover.svg");
const output = path.join(root, "public", "og-cover.png");

const svg = readFileSync(input);

await sharp(svg, { density: 150 })
  .resize(1200, 630, { fit: "cover" })
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(`Wrote ${output}`);
