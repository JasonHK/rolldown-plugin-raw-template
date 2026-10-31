# rolldown-plugin-raw-template

Import a file as a JavaScript template literal using the `?raw-template` query.
The file contents are exported as a default string, with template-literal syntax
escaped so the contents are preserved literally.


## Why?

Greasy Fork requires userscripts to remain readable before installation:

> Code posted to Greasy Fork must not be obfuscated or minified. Users must be
> given the opportunity to inspect and understand a script before installing
> it. If the script is bundled by a tool such as webpack, it must be output in
> non-minified form, with whitespace and variable names retained.
>
> — <cite>[Greasy Fork’s rules for posted scripts](https://greasyfork.org/en/help/code-rules)</cite>

Userscripts running in content-script scope (with `@grant` set to something
other than `none`) may need to run code in the page scope. This plugin lets you
import that code as a string for your userscript build to inject. Configure the
build to preserve the source in non-minified form; this plugin does not perform
the injection or control the bundler’s minification settings.


## Install

```sh
pnpm add -D rolldown-plugin-raw-template
```


## Configure

Register the plugin in your Vite configuration:

```ts
import { defineConfig } from "vite";
import rawTemplate from "rolldown-plugin-raw-template";

export default defineConfig({
	plugins: [rawTemplate()],
});
```


## Use

Append `?raw-template` to the file import. The imported value is a string
containing the file’s UTF-8 contents.

```ts
import message from "./message.txt?raw-template";

console.log(message);
```

The file contents are not evaluated as JavaScript. For example, backticks and
`${...}` sequences in the file remain part of the resulting string.

To import a JavaScript file’s source as a string, use the same query. You can
then inject that source into the page scope:

```ts
import pageScript from "./page-script.js?raw-template";

const script = document.createElement("script");
script.textContent = pageScript;
document.documentElement.append(script);
```


### TypeScript

Add the package’s client declaration to your Vite environment declarations (for
example, `src/vite-env.d.ts`):

```ts
/// <reference types="rolldown-plugin-raw-template/client" />
```

This declares imports matching `*?raw-template` as default-exported strings.


## Build

To build the package from a checkout:

```sh
pnpm install
pnpm build
```


## License

MIT
