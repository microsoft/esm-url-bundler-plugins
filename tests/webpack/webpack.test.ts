import * as path from 'path';
import * as fs from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { EsmUrlPlugin } from '../../packages/webpack/src';
import {
  createBundlerTestSuite,
  writePackageJson,
  TestOptions, getOutputFileNameFunction
} from '../shared';

const fixturesDir = path.resolve(__dirname, '../../test-fixtures');
const snapshotsDir = path.resolve(__dirname, 'snapshots');
const tmpDir = path.resolve(__dirname, 'tmp');

function writeWebpackConfig(testDir: string, entry: string, options: TestOptions = {}): void {
  const { outputModule = false, stripEsmQuery = false } = options;
  const useHtmlPlugin = fs.existsSync(path.join(testDir, 'input', 'index.html'));
  
  const htmlPluginImport = useHtmlPlugin 
    ? "const HtmlWebpackPlugin = require('html-webpack-plugin');\n" 
    : '';
  const htmlPluginOptions = outputModule 
    ? "{ template: './index.html', scriptLoading: 'module' }" 
    : "{ template: './index.html' }";
  const htmlPluginUsage = useHtmlPlugin 
    ? `new HtmlWebpackPlugin(${htmlPluginOptions}), ` 
    : '';
  
  const experimentsConfig = outputModule 
    ? `\n  experiments: {\n    outputModule: true,\n  },` 
    : '';
  const outputConfig = outputModule
    ? `{
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    module: true,
    clean: true,
  }`
    : `{
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  }`;
  
  const configContent = `const path = require('path');
${htmlPluginImport}const { EsmUrlPlugin } = require('@esm-url/webpack');

module.exports = {
  mode: 'development',
  devtool: false,${experimentsConfig}
  context: path.resolve(__dirname, 'input'),
  entry: './${entry}',
  output: ${outputConfig},
  plugins: [${htmlPluginUsage}new EsmUrlPlugin({ stripEsmQuery: ${stripEsmQuery} })],
};
`;
  fs.writeFileSync(path.join(testDir, 'webpack.config.js'), configContent);
  writePackageJson(testDir, 'webpack --config webpack.config.js');
}

async function runWebpack(testDir: string, entry: string, options: TestOptions = {}): Promise<webpack.Stats | undefined> {
  const { outputModule = false, stripEsmQuery = false } = options;
  const getOutputFileName = getOutputFileNameFunction(options.customOutputFileName);
  const inputDir = path.join(testDir, 'input');
  const outputDir = path.join(testDir, 'dist');
  const useHtmlPlugin = fs.existsSync(path.join(inputDir, 'index.html'));
  
  const plugins: webpack.WebpackPluginInstance[] = [];
  if (useHtmlPlugin) {
    const htmlPluginOptions: any = { template: path.join(inputDir, 'index.html') };
    if (outputModule) {
      htmlPluginOptions.scriptLoading = 'module';
    }
    plugins.push(new HtmlWebpackPlugin(htmlPluginOptions));
  }
  plugins.push(new EsmUrlPlugin({ stripEsmQuery, getOutputFileName }));

  const config: webpack.Configuration = {
    mode: 'development',
    devtool: false,
    context: inputDir,
    entry: `./${entry}`,
    output: {
      path: outputDir,
      filename: '[name].js',
      clean: true,
    },
    plugins,
  };

  if (outputModule) {
    config.experiments = { outputModule: true };
    config.output!.module = true;
  }
  
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);

    compiler.run((err, stats) => {
      if (err) return reject(err);
      if (stats?.hasErrors()) {
        console.error(stats.toString({ colors: true }));
      }
      compiler.close(() => {});
      resolve(stats);
    });
  });
}

describe('Webpack EsmUrlPlugin', () => {
  createBundlerTestSuite({
    bundler: 'webpack',
    fixturesDir,
    snapshotsDir,
    tmpDir,
    runBuild: runWebpack,
    writeConfig: writeWebpackConfig,
    validateBuild: (stats) => !stats?.hasErrors(),
    getEntryPoint: (fixture) => fixture.files.has('index.js') ? 'index.js' : 'src/main.js',
    getErrorMessage: (error, stats) => {
      if (error instanceof Error) return error.message;
      if (stats?.hasErrors()) {
        const info = stats.toJson();
        return info.errors?.map(e => {
          // Include file and location in error message
          let location = '';
          if (e.moduleIdentifier) {
            // Extract just the file name from the identifier
            const modulePath = e.moduleIdentifier.split('!').pop() || e.moduleIdentifier;
            const fileName = path.basename(modulePath);
            if (e.loc) {
              location = `${fileName}:${e.loc} - `;
            } else {
              location = `${fileName} - `;
            }
          }
          return `${location}${e.message}`;
        }).join('\n');
      }
      return error ? String(error) : undefined;
    },
  });
});
