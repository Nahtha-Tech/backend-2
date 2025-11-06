import { defineConfig } from "repomix";

export default defineConfig({
  output: {
    filePath: "codebase.xml",
    style: "xml",
    removeComments: true,
    headerText: "Backend api with elysiajs",
    truncateBase64: true,
    copyToClipboard: true,
  },
  ignore: {
    customPatterns: ["**/prismabox/**", "tsconfig.json"],
  },
});
