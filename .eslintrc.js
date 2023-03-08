// eslint-disable-next-line no-undef
module.exports = {
    "parser": '@typescript-eslint/parser',
  "parserOptions": {
    "project": './tsconfig.json',
    "sourceType": 'module',
    "tsconfigRootDir": __dirname,
  },
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest": true,
    },
    "ignorePatterns": ['.eslintrc.js'],

    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "root": true,
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
}
  