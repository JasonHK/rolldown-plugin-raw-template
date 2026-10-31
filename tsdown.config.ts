import type { UserConfig } from "tsdown";

export default
{
    entry: [
        "src/index.ts",
        "src/client.d.ts",
    ],
    outDir: "dist",
    sourcemap: true,
    platform: "node",
    dts: true,
    format: ["esm"],
    deps: {
        dts: {
            neverBundle: true,
        },
    },
} satisfies UserConfig;
