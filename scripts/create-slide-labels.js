// Recreate the faded label images after changing category labels.
import { mkdirSync, writeFileSync } from "node:fs";
import { brandCatalog } from "../src/data/brands.js";

const output = new URL("../public/categories/", import.meta.url);
mkdirSync(output, { recursive: true });

function escapeXml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function splitLabel(name) {
  const words = name.replaceAll(" — ", " ").split(" ");
  const lines = [""];
  for (const word of words) {
    const current = lines.length - 1;
    if (lines[current] && `${lines[current]} ${word}`.length > 10) {
      lines.push(word);
    } else {
      lines[current] = `${lines[current]} ${word}`.trim();
    }
  }
  return lines;
}

let count = 0;
for (const brand of brandCatalog) {
  for (const category of brand.categories) {
    const lines = splitLabel(category.label);
    const firstY = 140 - ((lines.length - 1) * 80) / 2;
    const text = lines
      .map(
        (line, index) =>
          `<tspan x="280" y="${firstY + index * 80}">${escapeXml(line)}</tspan>`,
      )
      .join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 280"><title>${escapeXml(category.label)}</title><text text-anchor="middle" dominant-baseline="middle" fill="#b0b0b0" font-family="Arial, sans-serif" font-size="76" font-weight="900">${text}</text></svg>`;
    writeFileSync(new URL(`${category.id}.svg`, output), svg);
    count += 1;
  }
}
console.log(`Created ${count} category label images.`);
