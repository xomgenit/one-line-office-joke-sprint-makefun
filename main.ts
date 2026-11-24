import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const entry =
  "The office plant has been here longer than three managers and outlived two restructures; it is the only one with job security.";

async function main(): Promise<void> {
  // Gate check: one line, 1-200 characters, not only whitespace.
  if (entry.length < 1 || entry.length > 200) {
    throw new Error(`entry is ${entry.length} characters, must be 1-200`);
  }
  if (entry.trim().length === 0 || entry.includes("\n")) {
    throw new Error("entry must be a single non-empty line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "entry.txt"), entry, "utf8");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
