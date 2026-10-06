# @zklogic/regenerator-runtime

> **Fork notice:** `@zklogic/regenerator-runtime` is a maintained, drop-in republish of the [`regenerator-runtime`](https://github.com/facebook/regenerator/tree/main/packages/runtime) package (MIT, © Facebook, Inc.), kept under the `@zklogic` scope because the original package is no longer maintained. The runtime code is unchanged. To use it for every dependent in your tree, alias it in `package.json`:
>
> ```json
> { "overrides": { "regenerator-runtime": "npm:@zklogic/regenerator-runtime@^0.14.3" } }
> ```

## What changed from `regenerator-runtime`, and why

**Why this exists.** `regenerator-runtime` is deprecated on npm and no longer
maintained, so security scanners (for example Sonatype Lifecycle) flag it as
end-of-life, and projects that still depend on it, directly or through
packages such as `kochava` or `canvg`, cannot upgrade to a maintained release.
This fork is a maintained copy that you can alias in place of the original
without touching your dependents.

**What is different**
- **Package name:** published as `@zklogic/regenerator-runtime`. This is the
  only change that affects consumers, and it is why the alias above is needed.
- **Runtime code:** `runtime.js` and `path.js` are byte-for-byte the code of
  upstream `regenerator-runtime`, so behaviour is identical, including defining
  the global `regeneratorRuntime`.
- **Package metadata:** `package.json` has the new name, author, repository,
  bugs URL and a `forkedFrom` field that credits the original authors.
- **Tests:** added `test/smoke.js` (`npm test`), which checks the runtime API,
  a generator driven through `mark`/`wrap`, `path.js` and the global. It is not
  published in the package.
- **Publishing:** `.github/workflows/publish.yml` runs the tests and publishes
  to npm when a `v*` tag is pushed.
- **Staying current:** `scripts/sync-upstream.sh` merges new upstream commits
  into the fork and re-applies the fork metadata, so the fork keeps tracking
  Facebook's repository.

Everything else, including the license (MIT, © Facebook, Inc.), is unchanged.
Bugs in the runtime itself belong upstream; bugs in this packaging belong in
the [fork's issues](https://github.com/ArfanKhalilMughal/regenerator/issues).

Standalone runtime for
[Regenerator](https://github.com/facebook/regenerator)-compiled generator
and `async` functions.

To import the runtime as a module (recommended), either of the following
import styles will work:
```js
// CommonJS
const regeneratorRuntime = require("@zklogic/regenerator-runtime");

// ECMAScript 2015
import regeneratorRuntime from "@zklogic/regenerator-runtime";
```

To ensure that `regeneratorRuntime` is defined globally, either of the
following styles will work:
```js
// CommonJS
require("@zklogic/regenerator-runtime/runtime");

// ECMAScript 2015
import "@zklogic/regenerator-runtime/runtime.js";
```

To get the absolute file system path of `runtime.js`, evaluate the
following expression:
```js
require("@zklogic/regenerator-runtime/path").path
```
