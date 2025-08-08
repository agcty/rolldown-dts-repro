# rolldown-plugin-dts project references repro

This is a minimal, self-contained reproduction of a rolldown-plugin-dts failure when a file that lives in a referenced tsconfig (shared project) is imported from two entrypoints.

## Layout

- `src/types.ts` — shared type
- `src/react/index.ts` — re-exports `Toast` from `../types`
- `src/server/index.ts` — re-exports `Toast` from `../types`
- `tsconfig.shared.json` — references only `src/types.ts` via `files`
- `tsconfig.react.json` + `tsconfig.server.json` — each references `tsconfig.shared.json`
- `tsdown.config.ts` — two entries (react + server), each with its own tsconfig

## Repro

```sh
pnpm build
```

Expected: dts emitted successfully

Actual: build fails with error similar to:

```
[plugin rolldown-plugin-dts:generate]
Error: Unable to load file .../src/types.ts from the program.
```

Notes:

- Both leaf tsconfigs include just their own subfolders
- The shared tsconfig lists `src/types.ts` in `files` and is referenced by both leaf projects.
