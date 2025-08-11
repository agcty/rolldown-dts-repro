import Debug from "debug";

//#region src/tsc/context.ts
const debug = Debug("rolldown-plugin-dts:tsc-context");
function createContext() {
	const programs = [];
	const files = /* @__PURE__ */ new Map();
	return {
		programs,
		files
	};
}
function invalidateContextFile(context, file) {
	debug(`invalidating context file: ${file}`);
	context.files.delete(file);
	context.programs = context.programs.filter((program) => {
		return !program.getSourceFiles().some((sourceFile) => sourceFile.fileName === file);
	});
}
const globalContext = createContext();

//#endregion
export { createContext, globalContext, invalidateContextFile };