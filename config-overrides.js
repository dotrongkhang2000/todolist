const path = require('path');

module.exports = {
  paths: (paths) => {
    paths.appSrc = path.join(__dirname, 'src');
    paths.appIndexJs = path.join(paths.appSrc, 'renderer', 'index.tsx');
    paths.appTypeDeclarations = path.join(
      paths.appSrc,
      'renderer',
      'react-app-env.d.ts'
    );
    return paths;
  },

  webpack: (config) => {
    config.target = 'web';
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  }
};
