// This file is a CJS because eslint can't handle ESM

const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**.ts', '**.tsx'],
      extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      rules: {
        // Default exports are often not a good way to handle imports they are not 
        // harmful proper scoping of imports is important and good practice for
        // cleaner code in general eg
        // ```
        // import { apiCall } from './api'
        // apiCall(params)
        // ```
        // 
        // versus
        // ```
        // import api from './api'
        // api.apiCall(params)
        // ```
        'import/prefer-default-export': 'off',
        // ESLint can't handle typescript aliases properly
        'import/no-unresolved': 'off',
    
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['**.js', '**.cjs'],
      extends: [
        'airbnb',
        'airbnb/hooks'
      ],
      rules: {
        // see description above, sadly rule sharing in eslint is as well broken
        'import/prefer-default-export': 'off',
        // js files in this project use dev depenedencies
        'import/no-extraneous-dependencies': 'off',
      }
    },
  ]
}
