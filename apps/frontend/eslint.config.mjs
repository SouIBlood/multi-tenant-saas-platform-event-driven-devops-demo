// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import tseslint from "typescript-eslint";

export default withNuxt({
  ...tseslint.configs.recommendedTypeChecked,
});
