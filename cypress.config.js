const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://display-templates.local.itkdev.dk/",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
  retries: {
    runMode: 3,
    openMode: 0,
  },
  defaultCommandTimeout: 500,
  viewportWidth: 2500,
  viewportHeight: 1500,
});
