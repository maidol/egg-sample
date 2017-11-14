'use strict;'

module.exports = {
  proxy(k, v) {
    
  },
  dbpool(dbname) {
    this._dbpool = this._dbpool || {};
    if(!this._dbpool[dbname]){
      this._dbpool[dbname] = this.mysql.createPool(this.config.db[dbname]);
    }
    return this._dbpool[dbname];
  },
  dbconn(dbname){
    return this.dbpool(dbname).getConnection();
  },
  beginTransaction(dbname, promisecallback){
    let conn;
    return this.dbconn(dbname).then(connection=>{
      conn = connection;
      return conn.beginTransaction();
    })
    .then(()=>{
      return promisecallback(conn);
    })
    .then((res)=>{
      return conn.commit().then(()=>{
        conn.release();
        return res;
      });
    })
    .catch(err=>{
      return conn.rollback().then(()=>{
        conn.release();
        throw err;
      });
    });
  },
  initCWAgent(){
    const self = this;
    const lconfig = this.config.agentLogger;
    if(this.config.env === 'unittest'){
      // 由agent负责初始化所有logger
      for (const key in this.config.cwLogger.bunyan.categorys) {
        if (this.config.cwLogger.bunyan.categorys.hasOwnProperty(key)) {
          lconfig.bunyan.categorys[key] = this.config.cwLogger.bunyan.categorys[key];
        }
      }
    }
    lconfig.bunyan.categorys = Object.keys(lconfig.bunyan.categorys).map(k => lconfig.bunyan.categorys[k]);
    const log = require('cw-logger')(lconfig);
    this.cwLog = log;
  
    lconfig.bunyan.categorys.forEach(c=>{
      let name = `${c.name}Logger`;
      this[name] = log[c.name];
    });

    this.cwLogger = log.agent;
  
    this.logger.info('init cw-agent ...');

    this.on('error', (err, ctx)=> {
      self.cwLogger.error("app-on-error事件:", err);
    });

    process.on('unhandledRejection', function (err) {
      self.cwLogger.error("process-on-unhandledRejection事件:", err);
    });
    
    process.on('uncaughtException', function (err) {
      self.cwLogger.error("process-on-uncaughtException事件:", err);
    });
  }
};