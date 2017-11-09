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
      logRoot: require('path').resolve(__dirname, '../logs'), // 日志根目录(需根据实际情况设置)
      logLevel: 'info', // file
      logLevel4console: 'debug', // console
      enableBunyan: true, // 默认启用bunyan
      bunyan: {
        // 级别分别是: TRACE DEBUG INFO WARN ERROR FATAL
        categorys: [{
          name: 'console',
          type: 'console',
          // logLevel4console: 'debug',
          pretty: true
        }, {
          name: 'app', // 模块/分类
          type: 'rotatingFile',
          pretty: true,
          rotateConfig: {
            period: '1d', // The period at which to rotate.
            totalFiles: 15 //The maximum number of rotated files to keep. 0 to keep files regardless of how many there are.
          }
        }, {
          name: 'common', // 模块/分类
          type: 'rotatingFile',
          pretty: true,
          rotateConfig: {
            period: '1d', // The period at which to rotate.
            totalFiles: 0 //The maximum number of rotated files to keep. 0 to keep files regardless of how many there are.
          }
        }]
      }
    }
  }
}