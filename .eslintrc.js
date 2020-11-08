module.exports = {
  root: true,
  extends: [
    'blockabc/typescript'
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  globals: {
    PROD: true
  },
  rules: {
  }
}
