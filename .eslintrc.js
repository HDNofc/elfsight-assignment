module.exports = {
  extends: ['react-app', 'prettier'],
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {

      },
    },
  ],
};
