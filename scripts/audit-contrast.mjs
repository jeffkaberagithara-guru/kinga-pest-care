// Computes WCAG contrast for the semantic colour pairs actually used in the UI,
// reading the values straight from app/globals.css so the audit can never drift
// from the tokens. Run with `npm run audit:contrast`. Exits non-zero on failure.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const css = readFileSync(path.join(root, "app", "globals.css"), "utf8");

const tokens = { white: "#ffffff" };
for (const match of css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})/g)) {
  tokens[match[1]] = match[2];
}

const hexToRgb = (hex) => {
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

// [foreground token, background token, minimum, description]
const pairs = [
  ["text", "background", 7, "Body ink on ivory canvas"],
  ["text", "surface", 7, "Body ink on white surface"],
  ["text-secondary", "background", 4.5, "Secondary text on ivory"],
  ["text-secondary", "surface-2", 4.5, "Secondary text on sage"],
  ["muted", "background", 4.5, "Muted text on ivory"],
  ["muted", "surface", 4.5, "Muted text on white"],
  ["muted", "surface-2", 4.5, "Muted text on sage"],
  ["muted", "surface-3", 4.5, "Muted text on quiet ivory"],
  ["primary", "background", 4.5, "Forest as text on ivory"],
  ["clay-deep", "background", 4.5, "Clay eyebrow on ivory"],
  ["accent-deep", "background", 4.5, "Citron-family text on ivory"],
  ["accent-ink", "accent", 4.5, "Ink on citron buttons"],
  ["white", "primary", 4.5, "White on forest"],
  ["white", "primary-strong", 4.5, "White on deep forest footer"],
  ["accent-on-dark", "primary", 4.5, "Citron on forest"],
  ["accent-on-dark", "primary-strong", 4.5, "Citron on deep forest"],
  ["danger", "surface", 4.5, "Error text on white"],
  ["success", "success-soft", 3, "Success icon on its wash"],
];

let failed = 0;
for (const [fg, bg, min, label] of pairs) {
  if (!tokens[fg] || !tokens[bg]) {
    console.error(`MISSING TOKEN: ${fg} or ${bg}`);
    failed += 1;
    continue;
  }
  const r = ratio(tokens[fg], tokens[bg]);
  const ok = r >= min;
  if (!ok) failed += 1;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${label}  [${fg} on ${bg}]`,
  );
}

console.log(`\n${pairs.length - failed}/${pairs.length} pairs pass.`);
process.exit(failed === 0 ? 0 : 1);
