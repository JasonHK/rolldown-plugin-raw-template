import type { UserConfig } from "tsdown";

export default
[
    {
        entry: "src/index.ts",
        outDir: "dist",
        sourcemap: true,
        platform: "node",
        dts: true,
        format: ["esm"],
        copy: [
            "src/client.d.ts",
        ],
    },
] satisfies UserConfig[];
