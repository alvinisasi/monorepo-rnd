/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ['@repo/eslint-config/react-internal.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.lint.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        // project: true
    },
    // rules: {
    //   "@next/next/no-html-link-for-pages": "off"
    // },
    // settings: {
    //   next: {
    //     rootDir: "../../apps/**"
    //   }
    // }
}
