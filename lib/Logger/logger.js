const log4js = require('log4js');
// const path = require('path');

log4js.configure({
  appenders: {
    // file: { type: 'file', filename: path.resolve(__dirname, 'main.log') },
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' },
  },
});

module.exports = {
  Logger: log4js.getLogger(),
};
