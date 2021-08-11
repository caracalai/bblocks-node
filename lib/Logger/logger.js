const log4js = require('log4js');

log4js.configure({
  appenders: {
    file: { type: 'file', filename: 'main.log' },
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['file', 'console'], level: 'debug' },
  },
});

module.exports = {
  Logger: log4js.getLogger(),
};
