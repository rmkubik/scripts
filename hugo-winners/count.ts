import { fs } from "zx";

const file = await fs.readFile(
  "/Users/ryankubik/Google Drive/notes/personal/notes/Hugo Award Winners.md",
  "utf8",
);
const lines: string[] = file.split("\n");
// just pulled 8 from the amount of frontmatter and table info, cropped
// to only be the table contents
const tableLines = lines.slice(8);
const total = tableLines.length;
const read = tableLines.reduce((count, line) => {
  if (line.includes("✅")) {
    return count + 1;
  }
  return count;
}, 0);

console.log(`I have read ${read} of ${total} Hugo Award Winners`);
