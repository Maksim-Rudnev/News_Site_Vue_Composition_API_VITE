/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  env: {
    node: true,
  },
  root: true,
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    withDefaults: "readonly",
  },
  rules: {
    "no-console": "warn",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
};

// // module.exports = {
// //   env: {
// //     node: true,
// //   },
// //   globals: {
// //     defineProps: 'readonly',
// //     defineEmits: 'readonly',
// //     withDefaults: 'readonly',
// //   },
// //   extends: [
// //     '@vue/typescript/recommended',
// //     'eslint:recommended',
// //     'plugin:vue/vue3-recommended',
// //     'prettier',
// //   ],
// // };
