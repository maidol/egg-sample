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
      level: 'debug',
      consoleLevel: 'debug'
    },
  }
}