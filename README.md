<!-- markdownlint-disable MD041 -->

## Go-to Definition broken with DTS sourcemaps when using custom tsconfig

When generating typings with `rolldown-plugin-dts` via `tsdown`, IDE Go to Definition (e.g. VSCode) can jump to generated `.d.ts` files instead of the original `.ts` source if `tsdown` is configured with a custom `tsconfig` (e.g. per-target configs, project references, or path aliases).

This repo contains two minimal examples that differ only by the `tsdown` `tsconfig` setting:

- `working/` uses `tsconfig: false` and IDE navigation works
- `not-working/` uses `tsconfig: "tsconfig.*.json"` and IDE navigation jumps to bundled `.d.ts`

### What’s wrong

In the broken case, the generated `index.d.ts.map` lists `.d.ts` files as its sources, not the original `.ts` files. That prevents editors from tracing the declaration back to the source.

Example from `not-working/package-a/dist/react/index.d.ts.map`:

```json
{
  "version": 3,
  "file": "index.d.ts",
  "names": ["Toast", "sharedValue", "Toast", "testValue"],
  "sources": ["../../src/types.d.ts", "../../src/react/index.d.ts"],
  "sourcesContent": [
    "export type Toast = {\n    title: string;\n    description?: string;\n    duration?: number;\n    type: \"info\" | \"success\" | \"error\" | \"warning\";\n    notificationId?: string;\n};\nexport declare const sharedValue = 1;\n",
    "export type { Toast } from \"../types\";\nexport declare const testValue = 1;\n"
  ],
  "mappings": "..."
}
```

In the working case, the sourcemap points at the real `.ts` sources:

```json
{
  "version": 3,
  "file": "index.d.ts",
  "names": [],
  "sources": ["../../src/types.ts", "../../src/react/index.ts"],
  "sourcesContent": [],
  "mappings": "..."
}
```

### Why it happens (observed)

Providing a custom `tsconfig` causes the DTS build to resolve through intermediate `.d.ts` outputs for referenced projects/entries. The sourcemap emitted by the plugin then records those `.d.ts` files in `sources`, instead of walking back to the original `.ts` files. Editors rely on these `sources` to power Go to Definition, so navigation ends up at generated declarations rather than source.

Related discussion: “Unable to load file … from the program” when using TS project references for shared types. While that issue started from a different symptom, it points to the same root cause: the TypeScript program used by the plugin lacks the referenced source files and falls back to `.d.ts` artifacts. See [rolldown-plugin-dts issue #80](https://github.com/sxzz/rolldown-plugin-dts/issues/80).

### Repro in this repo

- Open the workspace in an editor that supports Go to Definition (e.g. VSCode)
- Compare navigation from `working/package-b/src/index.ts` versus `not-working/package-b/src/index.ts` to the `Toast` type defined in `package-a/src/types.ts`
  - In `working/`, navigation reaches the `.ts` source
  - In `not-working/`, navigation targets the bundled/generated `.d.ts` and does not reach the `.ts` source

### Config difference that triggers the issue

`not-working/package-a/tsdown.config.ts` (custom `tsconfig` enabled):

```ts
// react build
tsconfig: "tsconfig.react.json";
// server build
tsconfig: "tsconfig.server.json";
```

`working/package-a/tsdown.config.ts` (uses default TS compiler options, no project `tsconfig`):

```ts
tsconfig: false;
```

### Workarounds tried

- **Disable custom tsconfig**: `tsconfig: false` fixes the mapping but removes support for path aliases and project references that many packages need.
- **Manually include shared files in leaf configs**: did not resolve the mapping to `.ts` sources.
- **Duplicate shared types per entry**: sidesteps the problem but defeats project references and increases maintenance cost.
