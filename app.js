'use strict;'

module.exports = app => {
  app.logger.info('app running ...', app.config.env, app.baseDir, app.name);

  app.beforeStart(async() => {
    app.cache = Promise.resolve('cache');
  });

  app.ready((err) => {
    // console.log('hi, app, app.ready', process.pid);
    app.logger.info('hi, app, app.ready', process.pid);
    app.messenger.sendToAgent('app-readyfor-workerid', {
      pid: process.pid
    });
  });

  // 在中间件最前面统计请求时间
  app.config.coreMiddleware.unshift('report');

  app.messenger.on('egg-ready', data => {
    app.logger.info('hi, app, all egg app_workers are ready', process.pid);
  });

  app.messenger.on('allocation-workid', data => {
    // 设置workerId
    app.workerId = data;
    process.env.pm_id = data;
    if(app.config.env === 'local'){
      app.workerId = undefined;
      delete process.env.pm_id;
    }

    // console.log('hi, app, on allocation-workid', process.pid, app.workerId);
    app.logger.info('hi, app, on allocation-workid', process.pid, app.workerId);

    // 初始化
    app.initCWApp();
  });
}

// function initCWApp(app){
//   const log = require('cw-logger')(app.config.cwLogger);
//   app.cwLog = log;

//   app.config.cwLogger.bunyan.categorys.forEach(c=>{
//     let name = `${c.name}Logger`;
//     app[name] = log[c.name];
//   });

//   console.log('init cw-app ...');
// }