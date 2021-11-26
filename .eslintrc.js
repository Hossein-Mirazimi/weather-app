module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-unused-expressions": 0,
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto',
      }
    ],
    "vue/order-in-components": [
      "warn",
      {
          "order": [
              "el",
              "name",
              "key",
              "parent",
              "functional",
              "watchQuery",
              "layout",
              "middleware",
              "validate",
              "head",
              "fetch",
              "asyncData",
              [
                  "delimiters",
                  "comments"
              ],
              [
                  "components",
                  "directives",
                  "filters"
              ],
              "extends",
              "mixins",
              [
                  "provide",
                  "inject"
              ],
              "ROUTER_GUARDS",
              "scrollToTop",
              "transition",
              "loading",
              "inheritAttrs",
              "model",
              [
                  "props",
                  "propsData"
              ],
              "emits",
              "setup",
              "data",
              "computed",
              "watch",
              "LIFECYCLE_HOOKS",
              "methods",
              [
                  "template",
                  "render"
              ],
              "renderError"
          ]
      }
    ]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
