import fs from "node:fs/promises";
import type { Plugin } from "vite";

const SUFFIX = "?raw-template";

export interface RawTemplatePlugin
{
    name: string;
    enforce: "pre";
    resolveId(source: string, importer: string | undefined): Promise<string | null>;
    load(id: string): Promise<string | null>;
}

export default function rawTemplate(): RawTemplatePlugin
export default function rawTemplate(): Plugin
{
    return {
        name: "raw-template",
        enforce: "pre",
        
        async resolveId(source: string, importer: string | undefined): Promise<string | null>
        {
            if (!source.endsWith(SUFFIX)) { return null; }

            const resolved = await this.resolve(source, importer, { skipSelf: true });
            return (resolved?.id ?? null);
        },

        async load(id: string): Promise<string | null>
        {
            if (!id.endsWith(SUFFIX)) { return null; }

            const path = id.slice(0, -SUFFIX.length);
            const source = await fs.readFile(path, "utf-8");

            const escaped = source.replace(/(\\|`|\$\{)/g, "\\$1");
            return `export default \`${escaped}\`;`
        },
    };
}
