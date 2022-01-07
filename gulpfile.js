const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// Config
const path = require('./config/path');
const app = require('./config/app');

// Tasks
const clear = require('./tasks/clear');
const html = require('./tasks/html');
const css = require('./tasks/css');
const js = require('./tasks/js');
const img = require('./tasks/img');

// Server
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
  });
};

// Watching
const watcher = () => {
  watch(path.html.watch, html).on('all', browserSync.reload);
  watch(path.css.watch, css).on('all', browserSync.reload);
  watch(path.js.watch, js).on('all', browserSync.reload);
  watch(path.img.watch, img).on('all', browserSync.reload);
};

const build = series(clear, parallel(html, css, js, img));

const dev = series(build, parallel(watcher, server));

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.watch = watcher;
exports.clear = clear;

exports.default = app.isProd ? build : dev;
