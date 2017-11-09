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
      logLevel4console: 'debug', // console
      bunyan: {
        // 级别分别是: TRACE DEBUG INFO WARN ERROR FATAL
        categorys: {
          'console': {
            name: 'console',
            type: 'console',
            // logLevel4console: 'debug',
            pretty: true
          },
          'app': {
            name: 'app', // 模块/分类
            type: 'rotatingFile',
            pretty: true,
            rotateConfig: {
              period: '1d', // The period at which to rotate.
              totalFiles: 15 //The maximum number of rotated files to keep. 0 to keep files regardless of how many there are.
            }
          },
          'common': {
            name: 'common', // 模块/分类
            type: 'rotatingFile',
            pretty: true,
            rotateConfig: {
              period: '1d', // The period at which to rotate.
              totalFiles: 0 //The maximum number of rotated files to keep. 0 to keep files regardless of how many there are.
            }
          }
        }
      }
    }
  }
}