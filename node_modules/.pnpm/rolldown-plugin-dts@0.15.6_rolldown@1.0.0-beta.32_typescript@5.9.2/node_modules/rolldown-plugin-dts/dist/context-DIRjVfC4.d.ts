import ts from "typescript";

//#region src/tsc/context.d.ts
interface TscContext {
  programs: ts.Program[];
  files: Map<string, string>;
}
declare function createContext(): TscContext;
declare function invalidateContextFile(context: TscContext, file: string): void;
declare const globalContext: TscContext;
//#endregion
export { TscContext, createContext, globalContext, invalidateContextFile };