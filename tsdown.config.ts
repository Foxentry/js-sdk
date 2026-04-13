import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm", "umd"],
  globalName: "Foxentry",
  dts: true,
  clean: true,
  tsconfig: "tsconfig.json",
});
