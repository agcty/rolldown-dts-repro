import { defineConfig } from "tsdown"

export default [
  defineConfig({
    entry: { "react/index": "src/react/index.ts" },
    format: ["esm"],
    outDir: "dist",
    dts: { sourcemap: true },
    sourcemap: true,
    clean: true,
    tsconfig: "tsconfig.react.json",
    target: "esnext",
    platform: "browser",
    treeshake: true,
    minify: false,
  }),
  defineConfig({
    entry: { "server/index": "src/server/index.ts" },
    format: ["esm"],
    outDir: "dist",
    dts: { sourcemap: true },
    sourcemap: true,
    clean: true,
    tsconfig: "tsconfig.server.json",
    target: "esnext",
    platform: "node",
    treeshake: true,
    minify: false,
  }),
]
