'use strict';

// Smoke test for @zklogic/regenerator-runtime: the runtime code is unchanged from
// regenerator-runtime 0.14.1, so this checks that the package still loads and behaves.

const assert = require('assert');
const { execFileSync } = require('child_process');
const path = require('path');

const runtime = require('../runtime');

// Public API used by regenerator-compiled code.
['wrap', 'mark', 'awrap', 'async', 'values', 'isGeneratorFunction', 'AsyncIterator'].forEach((name) => {
  assert.strictEqual(typeof runtime[name], 'function', `runtime.${name} should be a function`);
});

// Native generator and async function still work next to the runtime.
function* gen() { yield 1; yield 2; }
assert.deepStrictEqual([...gen()], [1, 2]);

// A hand-rolled regenerator-style generator driven through runtime.wrap/mark.
const marked = runtime.mark(function counter() {
  return runtime.wrap(function counter$(ctx) {
    for (;;) {
      switch (ctx.prev = ctx.next) {
        case 0: ctx.next = 2; return 'a';
        case 2: ctx.next = 4; return 'b';
        case 4: return ctx.stop();
        default: return ctx.stop();
      }
    }
  }, marked);
});
assert.deepStrictEqual(Array.from(marked()), ['a', 'b']);
assert.ok(runtime.isGeneratorFunction(marked));

// The package path helper resolves the runtime file.
assert.ok(require(path.join(__dirname, '..', 'path')).path.endsWith('runtime.js'));

// Requiring the runtime in a fresh process defines the global used by e.g. kochava.
const out = execFileSync(process.execPath, [
  '-e',
  "require('" + path.join(__dirname, '..', 'runtime').replace(/\\/g, '/') + "'); console.log(typeof regeneratorRuntime)"
]).toString().trim();
assert.strictEqual(out, 'object');

(async () => {
  const value = await Promise.resolve(42);
  assert.strictEqual(value, 42);
  console.log('@zklogic/regenerator-runtime: all smoke tests passed');
})();
