/* config-overrides.js */
/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, override } = require("customize-cra");
const path = require("path");

module.exports = override(useBabelRc());

module.exports = {
  paths: (paths) => {
    paths.appSrc = path.join(__dirname, "src");
    paths.appIndexJs = path.join(paths.appSrc, "renderer", "index.tsx");
    paths.appTypeDeclarations = path.join(
      paths.appSrc,
      "renderer",
      "react-app-env.d.ts"
    );
    return paths;
  },
};