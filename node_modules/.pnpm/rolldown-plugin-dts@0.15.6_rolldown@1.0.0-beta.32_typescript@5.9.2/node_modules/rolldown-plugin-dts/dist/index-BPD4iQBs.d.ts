import { TscContext } from "./context-DIRjVfC4.js";
import { TsConfigJson } from "get-tsconfig";
import ts from "typescript";
import { SourceMapInput } from "rolldown";

//#region src/tsc/index.d.ts
interface TscModule {
  program: ts.Program;
  file: ts.SourceFile;
}
interface TscOptions {
  tsconfig?: string;
  tsconfigRaw: TsConfigJson;
  cwd: string;
  build: boolean;
  incremental: boolean;
  entries?: string[];
  id: string;
  vue?: boolean;
  context?: TscContext;
}
interface TscResult {
  code?: string;
  map?: SourceMapInput;
  error?: string;
}
declare function tscEmit(tscOptions: TscOptions): TscResult;
//#endregion
export { TscModule, TscOptions, TscResult, tscEmit };