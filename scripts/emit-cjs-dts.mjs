// Generates CommonJS declaration files (*.d.cts) alongside the ESM *.d.ts files
// emitted by tsc. The published package exposes a CJS build (dist/index.cjs) via the
// `require` export condition; without a matching .d.cts, that condition would resolve
// to the ESM-flavored .d.ts (because package.json sets "type": "module"), which tools
// like @arethetypeswrong/cli flag as "FalseESM" — types masquerading as ESM.
//
// The .d.cts files are byte-for-byte copies of the .d.ts files, except relative module
// specifiers are rewritten from ".js" to ".cjs" so they resolve to sibling .d.cts files
// under Node's CJS (node16/nodenext) type resolution. Bare specifiers (e.g. "luxon")
// are left untouched.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DIST = "dist";

/** Rewrite relative ".js" module specifiers to ".cjs"; leave bare specifiers alone. */
const toCjsSpecifiers = (source) =>
  source.replace(/(["'])(\.\.?\/[^"']+)\.js\1/g, "$1$2.cjs$1");

/** @param {string} dir */
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
    } else if (entry.name.endsWith(".d.ts")) {
      const ctsPath = path.replace(/\.d\.ts$/, ".d.cts");
      await writeFile(ctsPath, toCjsSpecifiers(await readFile(path, "utf8")));
    }
  }
}

await walk(DIST);
