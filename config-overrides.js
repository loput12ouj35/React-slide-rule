const { disableEsLint, override } = require('customize-cra');

module.exports = {
  webpack: override(disableEsLint()),
};
