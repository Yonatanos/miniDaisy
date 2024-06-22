// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: [
    'prettier',
    'react',
    'import', // eslint-plugin-import for custom configure
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  rules: {
    'comma-spacing': ['error', { before: false, after: true }],
    'prettier/prettier': 'error',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    'space-before-blocks': 'warn',
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'global-require': 0,
    'no-throw-literal': 0,
    'class-methods-use-this': 0,
    'no-console': 0,
    'consistent-return': 0,
    'no-restricted-syntax': 0,
    'no-shadow': 0,
    'array-callback-return': 0,
    'no-continue': 0,
    'no-empty': 0,
    'no-loop-func': 0,
    'rest-spread-spacing': [2, 'never'],
    'comma-dangle': 0,
    '@typescript-eslint/no-unused-vars': 0,
    curly: 0,
    // import plugins
    'prefer-template': 'error',
    'import/no-unresolved': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/order': [
      'error',
      {
        groups: ['external', 'builtin', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'react/jsx-no-useless-fragment': 2,
    'react/jsx-sort-props': 2,
    'react/jsx-closing-bracket-location': 2,
    'react/jsx-closing-tag-location': 2,
    'padding-line-between-statements': [
      2,
      {
        blankLine: 'always',
        prev: ['var', 'let', 'const', 'expression', 'block', 'block-like'],
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: ['block', 'block-like'],
        next: ['var', 'let', 'const', 'expression'],
      },
      { blankLine: 'never', prev: 'import', next: 'import' },
    ],
    'max-len': [2, { code: 120 }],
    'arrow-spacing': 2,
    'key-spacing': 2,
    'react/jsx-tag-spacing': 2,
    indent: [2, 2, { SwitchCase: 1 }], // Validate JSX indentation (fixable)
    'react/jsx-indent': [2, 2], //  Validate props indentation in JSX (fixable)
    'react/jsx-key': [2], // Verify there's key for .map, [...] etc
    'react/jsx-equals-spacing': [2, 'never'], // No spaces around the = within jsx props
    'react/jsx-curly-spacing': [2, { when: 'never', children: true }], // No spaces between curly braces and its child. Child error example: <Hello>{ firstname }</Hello>
    'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'never' }], // Disallow unnecessary curly braces in JSX. Error example 1: <App>Hello world'}</App>; Error example 2: <App prop={'Hello world'} attr={'foo'} />;
    'object-curly-spacing': [2, 'always'],
    'no-multi-spaces': 2,
    // 'import/no-unused-modules': [1, { unusedExports: true }],
  },
};
