'use strict;'

module.exports = app => {
  app.logger.info('running ...', app.config.env, app.baseDir);
  // app.coreLogger.info('running ...', app.config.env);
  app.cache = {
    name: 'cache'
  };

  // 在中间件最前面统计请求时间
  app.config.coreMiddleware.unshift('report');
}