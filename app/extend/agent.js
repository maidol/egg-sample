'use strict;'

module.exports = {
  proxy(k, v) {
    
  },
  initCWAgent(){
    const log = require('cw-logger')(config);
    this.cwLog = log;
  
    config.bunyan.categorys.forEach(c=>{
      let name = `${c.name}Logger`;
      this[name] = log[c.name];
    });

    this.cwLogger = log.agent;
  
    console.log('init cw-agent ...');
  }
};

const config = {
  logRoot: require('path').resolve(__dirname, '../../logs'), // 日志根目录(需根据实际情况设置)
  logLevel: 'trace', // file
  logLevel4console: 'trace', // console
  enableBunyan: true, // 默认启用bunyan
  bunyan: {
    // 级别分别是: TRACE DEBUG INFO WARN ERROR FATAL
    categorys: [{
      name: 'console',
      type: 'console'
    }, {
      name: 'agent', // 模块/分类
      type: 'rotatingFile',
      rotateConfig: {
        period: '1d', // The period at which to rotate.
        totalFiles: 15 //The maximum number of rotated files to keep. 0 to keep files regardless of how many there are.
      }
    }]
  }
}