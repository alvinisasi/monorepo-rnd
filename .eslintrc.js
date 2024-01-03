// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
    settings: {
        next: {
            rootDir: 'packages/*',
        },
    },
    rules: {
        '@next/next/no-html-link-for-pages': 'error',
    },
    ignorePatterns: ['apps/**', 'packages/**'],
    extends: ['@repo/eslint-config/library.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
    },
}
