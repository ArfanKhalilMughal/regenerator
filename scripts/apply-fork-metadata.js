'use strict';

// Re-applies the fork-specific fields from .fork-metadata.json onto packages/runtime/package.json.
// Used after merging upstream, so upstream edits to name/author/repository etc. never win.
// Usage: node scripts/apply-fork-metadata.js [--version <x.y.z>]

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pkgPath = path.join(root, 'packages', 'runtime', 'package.json');
const meta = JSON.parse(fs.readFileSync(path.join(root, '.fork-metadata.json'), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const versionIndex = process.argv.indexOf('--version');
const version = versionIndex > -1 ? process.argv[versionIndex + 1] : pkg.version;

// Keep upstream's key order; fork-only keys (forkedFrom, publishConfig, contributors) go after "author".
const out = {};
for (const key of Object.keys(pkg)) {
  out[key] = key in meta ? meta[key] : pkg[key];
  if (key === 'author') {
    for (const extra of Object.keys(meta)) {
      if (!(extra in pkg)) out[extra] = meta[extra];
    }
  }
}
for (const key of Object.keys(meta)) {
  if (!(key in out)) out[key] = meta[key];
}
out.version = version;

fs.writeFileSync(pkgPath, JSON.stringify(out, null, 2) + '\n');
console.log(`packages/runtime/package.json: fork metadata applied (name=${out.name}, version=${out.version})`);
