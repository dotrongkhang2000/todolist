// https://www.sitepen.com/blog/getting-started-with-electron-typescript-react-and-webpack
import path from 'path';
import { Configuration } from 'webpack';

const projectPath = path.resolve(__dirname, '..');
const electronMainSrcPath = path.resolve(__dirname, '..', 'src', 'electron');

const getElectronMainConfig = () => {
  const plugins: Configuration['plugins'] = [];

  const config: Configuration = {
    mode: 'development' || 'production',
    entry: {
      electron: path.join(electronMainSrcPath, 'index.ts'), // Location of the entry point
    },
    target: 'electron-main', // Specifies which environment to target; Webpack knows about the electron main process specifically.
    module: {
      rules: [
        {
          test: /\.ts$/, // Specifies that this rule should match all files that end with the .ts extension.
          include: path.join('/', 'src', 'electron'), // Specifies that all files within src should be considered for matching this rule.
          use: [{ loader: 'ts-loader' }], // Specifies which loader(s) to use when this rule matches.
        },
      ],
    },
    output: {
      path: path.join(projectPath, 'build'),
      filename: '[name].js',
    },
    plugins,
  };

  return config;
};

// eslint-disable-next-line import/no-default-export
export default getElectronMainConfig();
