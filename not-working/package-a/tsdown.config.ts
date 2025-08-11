import { defineConfig } from "tsdown";

export default [
  defineConfig({
    entry: { "react/index": "src/react/index.ts" },
    format: ["esm"],
    outDir: "dist",
    dts: { sourcemap: true, build: true },
    sourcemap: true,
    clean: true,
    // set to false
    tsconfig: false,
    target: "esnext",
    platform: "browser",
    treeshake: true,
    minify: false,
  }),
  defineConfig({
    entry: { "server/index": "src/server/index.ts" },
    format: ["esm"],
    outDir: "dist",
    dts: { sourcemap: true, build: true },
    sourcemap: true,
    clean: true,
    // set to false
    tsconfig: false,
    target: "esnext",
    platform: "node",
    treeshake: true,
    minify: false,
  }),
];
