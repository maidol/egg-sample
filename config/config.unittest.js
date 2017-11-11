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
      // dir: require('path').join(app.baseDir, 'my/logs')
      level: 'info',
      consoleLevel: 'info',
      // outputJSON: true
    },
    agentLogger: {
      bunyan: {
        // 级别分别是: TRACE DEBUG INFO WARN ERROR FATAL
        categorys: {
          'console': {
            logLevel4console: 'info',
          }
        }
      }
    }
  }
}