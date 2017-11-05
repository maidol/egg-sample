'use strict;'

module.exports = app => {
  app.logger.info('app running ...', app.config.env, app.baseDir, app.name);

  app.beforeStart(async() => {
    app.cache = Promise.resolve('cache');
  });

  app.ready((err) => {
    console.log('hi, app, app.ready', process.pid);
    app.messenger.sendToAgent('app-readyfor-workerid', { pid: process.pid });
  });
  
  // 在中间件最前面统计请求时间
  app.config.coreMiddleware.unshift('report');

  app.messenger.on('egg-ready', data => {
    app.logger.info('hi, app, all egg app_workers are ready', process.pid);
  });

  app.messenger.on('allocation-workid', data => {
    // 设置workerId
    app.workerId = data;
    console.log('hi, app, on allocation-workid', process.pid, app.workerId);
  });
}