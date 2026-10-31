import { ViteUserConfig } from "vitest/config";

export default
{
    test: {
        coverage: {
            provider: "v8",
        },
    },
} satisfies ViteUserConfig;
