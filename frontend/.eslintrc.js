module.exports = {
  extends: ["eslint:recommended"],
  plugins: ["react"],
  rules: {
    // react plugin - options
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8, // optional, recommended 6+
  },
  globals: {
    cn: true,
    tw: true,
    paypal: true,
    _: true,
  },
  env: {
    browser: true
  }
}