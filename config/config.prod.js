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
      dir: require('path').join(app.baseDir, 'logs/egg'),
      level: 'info',
      consoleLevel: 'info',
      disableConsoleAfterReady: true,
      outputJSON: false
    }
  }
}