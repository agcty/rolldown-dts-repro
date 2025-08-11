import { defineConfig } from "tsdown";

export default [
  defineConfig({
    entry: { "index": "src/index.ts" },
    format: ["esm"],
    outDir: "dist",
    dts: { sourcemap: true, build: true },
    sourcemap: true,
    clean: true,
    tsconfig: "tsconfig.src.json",
    target: "esnext",
    platform: "node",
    treeshake: true,
    minify: false,
  }),
];
