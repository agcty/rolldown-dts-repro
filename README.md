Issue description:

Go-to definitions not working due to index.d.ts map that includes the d.ts file instead of the source file. Happens when using custom tsconfig files as a tsdown option.

The problem is the index.d.ts map that includes the d.ts file instead of the source file.

d.ts.map of not-working package a looks like this:

{"version":3,"file":"index.d.ts","names":["Toast","sharedValue","Toast","testValue"],"sources":["../../src/types.d.ts","../../src/react/index.d.ts"],

working one looks like this:

{"version":3,"file":"index.d.ts","names":[],"sources":["../../src/types.ts","../../src/react/index.ts"],


this happens when you use tsconfig: "tsconfig.json"

it does not happen when you use tsconfig: false

however that is not an option in some cases

as packages get more complex you want to use path aliases

tsconfig: false makes that impossible

sources":["../../src/types.d.ts", ...
