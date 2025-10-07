const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      systemvars: true, // Load all system environment variables as well
    })
  ]
};
