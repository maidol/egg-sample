'use strict;'

module.exports = {
  proxy(k, v) {
    
  },
  initCWAgent(){
    const lconfig = this.config.agentLogger;
    lconfig.bunyan.categorys = Object.keys(lconfig.bunyan.categorys).map(k => lconfig.bunyan.categorys[k]);
    const log = require('cw-logger')(lconfig);
    this.cwLog = log;
  
    lconfig.bunyan.categorys.forEach(c=>{
      let name = `${c.name}Logger`;
      this[name] = log[c.name];
    });

    this.cwLogger = log.agent;
  
    // console.log('init cw-agent ...');
    this.logger.info('init cw-agent ...');
  }
};