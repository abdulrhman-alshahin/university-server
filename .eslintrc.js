module.exports = {
   env: {
      node: true,
      browser: true,
      commonjs: true,
      es2021: true,
   },
   extends: 'eslint:recommended',
   parserOptions: {
      ecmaVersion: 12,
   },
   rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-undef': ['error'],
      'no-unused-vars': ['error', { ignore: ['next', 'req', 'res'] }],
   },
}
