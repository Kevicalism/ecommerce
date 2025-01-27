module.exports = {
  env: {
    node: true, // Enable Node.js global variables like `module` and `process`
    es6: true,  // Enable ES6 features
  },
  extends: [
    "eslint:recommended", // Use recommended ESLint rules
  ],
  parserOptions: {
    ecmaVersion: 2021, // Support modern JavaScript syntax
    sourceType: "module", // Enable ES6 module imports/exports
  },
  rules: {
    // Add custom rules here, if needed
  },
};
