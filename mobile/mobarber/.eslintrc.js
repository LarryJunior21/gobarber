module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
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
    "react/jsx-props-no-spreading": "off",
    "react/prefer-stateless-function": "off",
    "no-use-before-define": "off",
    "no-undef": "off"
  },
};

