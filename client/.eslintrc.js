module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:jsx-a11y/strict'
    ],
    plugins: ['react', 'jsx-a11y'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
            class: true
        }
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    globals: {
        ace: true,
        React: true
    },
    ignorePatterns: ['dist/*', 'node_modules/*', 'package.json', 'package-lock.json'],
    rules: {
        'prettier/prettier': 'error',
        indent: ['error', 4, { SwitchCase: 1 }],
        'require-jsdoc': 'off',
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'never'],
        'quote-props': ['error', 'as-needed'],
        'no-prototype-builtins': 'off',
        'react/prop-types': 'off'
    }
};
