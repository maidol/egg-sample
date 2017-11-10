'use strict;'

module.exports = app => {
  return {
    robot: {
      ua: [
        /sina/i,
        /Baiduspider/i
      ]
    },    
    logger: {
      // dir: require('path').join(app.baseDir, 'logs'),
      level: 'info',
      consoleLevel: 'info'
    },
    cwLogger: {
      logLevel4console: 'info', // console
      bunyan: {
        // 级别分别是: TRACE DEBUG INFO WARN ERROR FATAL
        categorys: {
          'console': {
            logLevel4console: 'debug',
            // pretty: true
          }
        }
      }
    }
  }
}