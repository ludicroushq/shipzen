const config = require("@vercel/style-guide/prettier");

module.exports = {
  ...config,
  plugins: [...config.plugins, "prettier-plugin-tailwindcss"],
};
