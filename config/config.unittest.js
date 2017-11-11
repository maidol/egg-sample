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