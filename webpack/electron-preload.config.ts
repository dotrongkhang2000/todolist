import path from 'path';
import { Configuration } from 'webpack';

const projectPath = path.resolve(__dirname, '..');
const electronPreloadPath = path.resolve(
  __dirname,
  '..',
  'src',
  'electron-preload',
  'preload'
);

const getElectronPreloadConfig = () => {
  const config: Configuration = {
    mode: 'development' || 'production',
    entry: {
      preload: path.join(electronPreloadPath, 'index.ts'),
    },
    target: 'electron-renderer',
    module: {
      rules: [
        {
          test: /\.ts$/, // Specifies that this rule should match all files that end with the .ts extension.
          loader: 'ts-loader', // Specifies which loader(s) to use when this rule matches.
          options: {
            compilerOptions: {
              noEmit: false,
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: path.join(projectPath, 'build'),
      filename: '[name].js',
    },
  };

  return config;
};

// eslint-disable-next-line import/no-default-export
export default getElectronPreloadConfig();
