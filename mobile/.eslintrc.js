const path = require('path');

module.exports = {
  'parserOptions': {
    'ecmaVersion': 8,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'experimentalObjectRestSpread': true,
    },
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
  ],
  'plugins': [
    'react',
    'graphql',
    'jest',
  ],
  'env': {
    'jest/globals': true,
    'browser': true,
    'es6': true,
  },
  'rules': {
    'graphql/template-strings': ['error', {
      'env': 'apollo',
      'schemaJsonFilepath': path.resolve(__dirname, '..', 'api', 'gql_schema.json')
    }],
    'semi': [ 'error', 'never' ],
    'no-trailing-spaces': 'error',
    'space-before-function-paren': [ 'error', 'never' ],
    'object-shorthand': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'curly': 'error',
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline',
    }],
    'max-len': ['error', 100],
    'no-unused-vars': [ 'error', { ignoreRestSiblings: true } ],
    'indent': ['error', 2, { SwitchCase: 1 }],
  },
}
