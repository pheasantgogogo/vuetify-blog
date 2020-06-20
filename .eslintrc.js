module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  plugins: ['vue'],
  globals: {
    NODE_ENV: false
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevent
    // ion consider switching to `plugin:vue/strongly-recommended` or
    // `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 添加，分号必须
    semi: ['error', 'never'],
    'no-unexpected-multiline': 'off',
    quotes: [
      'off',
      'single',
      {
        avoidEscape: true
      }
    ],
    'eol-last': 'off',
    'no-unreachable': 'off',
    'no-template-curly-in-string': 'off',
    'space-before-function-paren': 'off',
    'no-useless-escape': 'off',
    'no-unused-vars': 'off'
  }
}
