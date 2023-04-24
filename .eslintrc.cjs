module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json', 'vite.config.ts'],
  },
  plugins: ['react'],
  rules: {
    'react/react-in-tsx-scope': 'off',
    'react/tsx-uses-react': 'off',
    'comma-dangle': [],
  },
}
