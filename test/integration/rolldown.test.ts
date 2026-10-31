import path from "node:path";
import { rolldown, RolldownOutput } from "rolldown";

import rawTemplate from "../../src/index";

import { describe, expect, it } from "vitest";

async function build(fixture: string): Promise<RolldownOutput["output"]>
{
    const root = path.resolve(import.meta.dirname, "fixtures", fixture);

    const bundle = await rolldown(
        {
            input: path.join(root, "index.js"),
            plugins: [rawTemplate()],
        });

    const { output } = await bundle.generate({ format: "esm" });
    await bundle.close();

    return output;
}

describe("rolldown-plugin-raw-template", () =>
{
    it("should import the file using template literals", async () =>
    {
        const output = await build("basic");
        const code = (output[0].type === "chunk") ? output[0].code : "";

        expect(code).toMatch("`Hello\nWorld\n`");
    });

    it("should export the content of the file", async () =>
    {
        const output = await build("basic");
        const code = (output[0].type === "chunk") ? output[0].code : "";

        const module = await import(`data:application/javascript;base64,${Buffer.from(code).toString("base64")}`);
        expect(module.default).toBe("Hello\nWorld\n");
    });

    it("should import the file with escaped template syntaxes", async () =>
    {
        const output = await build("escapes");
        const code = (output[0].type === "chunk") ? output[0].code : "";

        expect(code).toMatch("`Backslash: \\\\\nBacktick: \\`\nDollar Braces: \\${1 + 1}\n`");
    });

    it("should export the content without evaluating the template syntaxes", async () =>
    {
        const output = await build("escapes");
        const code = (output[0].type === "chunk") ? output[0].code : "";

        const module = await import(`data:application/javascript;base64,${Buffer.from(code).toString("base64")}`);
        expect(module.default).toBe("Backslash: \\\nBacktick: `\nDollar Braces: ${1 + 1}\n");
    });
});
