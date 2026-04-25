/**
 * Postbuild script that runs react-snap with the modern Puppeteer Chrome binary.
 * react-snap ships with Puppeteer 1.x whose bundled Chromium doesn't support
 * modern JS syntax (optional chaining, etc.). This script resolves the Chrome
 * binary from the separately-installed puppeteer package and passes it via
 * the puppeteerExecutablePath option.
 */
const url = require('url');
const { run } = require('react-snap');
const puppeteer = require('puppeteer');

const { reactSnap, homepage, devDependencies, dependencies } = require(
  `${process.cwd()}/package.json`
);

const publicUrl = process.env.PUBLIC_URL || homepage;

const reactScriptsVersion = parseInt(
  (devDependencies && devDependencies['react-scripts']) ||
    (dependencies && dependencies['react-scripts'])
);
let fixWebpackChunksIssue;
switch (reactScriptsVersion) {
  case 1:
    fixWebpackChunksIssue = 'CRA1';
    break;
  case 2:
    fixWebpackChunksIssue = 'CRA2';
    break;
}

const executablePath = puppeteer.executablePath();
console.log(`Using Chrome at: ${executablePath}`);

run({
  publicPath: publicUrl ? url.parse(publicUrl).pathname : '/',
  fixWebpackChunksIssue,
  ...reactSnap,
  puppeteerExecutablePath: executablePath,
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
