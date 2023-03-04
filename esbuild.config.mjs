import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import { config } from "dotenv";

config();

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = process.argv[2] === "production";

const dir = prod ? "./" : process.env.OUTDIR ?? "./";

esbuild
    .build({
        banner: {
            js: banner
        },
        entryPoints: ["src/main.ts", "src/styles.css"],
        bundle: true,
        external: [
            "obsidian",
            "electron",
            "codemirror",
            "@codemirror/autocomplete",
            "@codemirror/closebrackets",
            "@codemirror/collab",
            "@codemirror/commands",
            "@codemirror/comment",
            "@codemirror/fold",
            "@codemirror/gutter",
            "@codemirror/highlight",
            "@codemirror/history",
            "@codemirror/language",
            "@codemirror/lint",
            "@codemirror/matchbrackets",
            "@codemirror/panel",
            "@codemirror/rangeset",
            "@codemirror/rectangular-selection",
            "@codemirror/search",
            "@codemirror/state",
            "@codemirror/stream-parser",
            "@codemirror/text",
            "@codemirror/tooltip",
            "@codemirror/view",
            ...builtins
        ],
        format: "cjs",
        watch: !prod,
        minify: prod,
        target: "es2020",
        logLevel: "info",
        sourcemap: !prod ? "inline" : false,
        treeShaking: true,
        outdir: dir
    })
    .catch(() => process.exit(1));
