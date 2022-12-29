module.exports = {
    extends: ['eslint:recommended', 'google', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 9
    },
    env: {
        node: true,
        mocha: true,
        es6: true
    },
    ignorePatterns: ['node_modules/*', 'package.json', 'package-lock.json'],
    rules: {
        'prettier/prettier': 'error',
        indent: ['error', 4, { SwitchCase: 1 }],
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'never'],
        'quote-props': ['error', 'as-needed'],
        'new-cap': 0,
        'require-jsdoc': 0,
        'no-prototype-builtins': 0,
        'guard-for-in': 'off'
    }
};
