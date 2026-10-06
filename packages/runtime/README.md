# @zklogic/regenerator-runtime

> **Fork notice:** `@zklogic/regenerator-runtime` is a maintained, drop-in republish of the [`regenerator-runtime`](https://github.com/facebook/regenerator/tree/main/packages/runtime) package (MIT, © Facebook, Inc.), kept under the `@zklogic` scope because the original package is no longer maintained. The runtime code is unchanged. To use it for every dependent in your tree, alias it in `package.json`:
>
> ```json
> { "overrides": { "regenerator-runtime": "npm:@zklogic/regenerator-runtime@^0.14.3" } }
> ```

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
