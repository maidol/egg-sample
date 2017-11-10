'use strict;'

const CACHE = Symbol('Application#cache');
module.exports = {
  get cache() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[CACHE]) {
      // 实际情况肯定更复杂
      this[CACHE] = { name: 'cache' };
    }
    return this[CACHE];
  },
  set cache(value) {
    this[CACHE] = value;
  },
  initCWApp(){
    const lconfig = this.config.cwLogger;
    lconfig.bunyan.categorys = Object.keys(lconfig.bunyan.categorys).map(k => lconfig.bunyan.categorys[k]);
    const log = require('cw-logger')(lconfig);
    this.cwLog = log;
  
    this.config.cwLogger.bunyan.categorys.forEach(c=>{
      let name = `${c.name}Logger`;
      this[name] = log[c.name];
    });

    this.cwLogger = log.app;
  
    // console.log('init cw-app ...');
    this.logger.info('init cw-app ...');
  }
}