# rolldown-plugin-dts tsBuildInfoFile repro

This is a minimal, self-contained reproduction of a rolldown-plugin-dts failure when custom `tsBuildInfoFile` paths are used across a small project-references setup.

The original project-references error ("Unable to load file … from the program") has been addressed per the discussion in [sxzz/rolldown-plugin-dts#80](https://github.com/sxzz/rolldown-plugin-dts/issues/80). The remaining issue is specifically about custom `.tsbuildinfo` paths.

## Layout

- `src/types.ts` — shared type
- `src/react/index.ts` — re-exports `Toast` from `../types`
- `src/server/index.ts` — re-exports `Toast` from `../types`
- `tsconfig.shared.json` — references only `src/types.ts` via `files`, sets a custom `tsBuildInfoFile`
- `tsconfig.react.json` + `tsconfig.server.json` — each references `tsconfig.shared.json`, both set custom `tsBuildInfoFile`
- `tsdown.config.ts` — two entries (react + server), each with its own tsconfig

## Repro (custom tsBuildInfoFile paths)

1. Remove any existing build info files

```sh
rm -rf .tsbuildinfo dist
find . -name '*.tsbuildinfo' -delete
```

2. First build works

```sh
pnpm build
```

3. Second build fails

```sh
pnpm build
```

## Expected

- Repeated builds succeed when `tsBuildInfoFile` is set to custom paths in all participating `tsconfig*.json` files.

## Actual

- The first build succeeds, but a subsequent build fails when custom `tsBuildInfoFile` paths are present.

## Workaround

- Comment out or remove all `tsBuildInfoFile` entries from `tsconfig.react.json`, `tsconfig.server.json`, and `tsconfig.shared.json`.
- After removing these options, `pnpm build` can be run repeatedly and continues to succeed.

## Notes

- `.gitignore` already ignores both the `.tsbuildinfo/` directory and `*.tsbuildinfo` files.
- This repository is meant to demonstrate the behavior for investigation and tracking.
