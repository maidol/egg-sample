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
  }
}