const del = require('del');

// Config
const path = require('../config/path');

const clear = () => {
  return del(path.root);
};

module.exports = clear;
