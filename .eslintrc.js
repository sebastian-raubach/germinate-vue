module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-unused-properties': 'off',
    'vue/no-mutating-props': 'off',
    'vue/custom-event-name-casing': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}