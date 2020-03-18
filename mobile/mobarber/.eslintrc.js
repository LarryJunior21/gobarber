module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern" : "next" }],
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [
      "warn",
      { extensions: ['.jsx', '.js']}
    ],
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "react/jsx-props-no-spreading": "off"
  },
};

