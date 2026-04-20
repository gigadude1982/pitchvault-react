'use strict';

// Set development environment before loading react-scripts config.
// react-scripts/scripts/build.js hardcodes NODE_ENV to 'production',
// so we drive webpack directly with the development config instead.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.GENERATE_SOURCEMAP = 'true';

require('react-scripts/config/env');

const webpack = require('webpack');
const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const configFactory = require('react-scripts/config/webpack.config');

const config = configFactory('development');

// Point output to the build directory (dev config defaults to in-memory for dev server)
config.output.path = paths.appBuild;
// Write files to disk instead of using dev-server memory fs
delete config.devServer;

// Clean and prepare the build folder
fs.emptyDirSync(paths.appBuild);
fs.copySync(paths.appPublic, paths.appBuild, {
  dereference: true,
  filter: (file) => file !== paths.appHtml,
});

console.log('Creating an unminified development build...\n');

webpack(config, (err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error('Build failed with errors:');
    info.errors.forEach((e) => console.error(e.message));
    process.exit(1);
  }

  if (stats.hasWarnings()) {
    console.warn('Build warnings:');
    info.warnings.forEach((w) => console.warn(w.message));
  }

  console.log('\nDevelopment build complete. Output in build/ directory.');
});
