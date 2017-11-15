'use strict;'

module.exports = app => {
  app.logger.info('app running ...', app.config.env, app.baseDir, app.name);

  app.mysql = require('./lib/mysql');
  app.Joi = require('joi');
  app.apiCode = require('./lib/api_code_enum');

  app.beforeStart(async() => {
    app.cache = await Promise.resolve({});
  });

  app.ready(err => {
    if (err) {}
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
    if (app.config.env === 'local') {
      app.workerId = undefined;
      delete process.env.pm_id;
    }

    app.logger.info('hi, app, on allocation-workid', process.pid, app.workerId);

    // 初始化
    app.initCWApp();
  });
}