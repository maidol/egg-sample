'use strict;'

module.exports = (options, app) => {
  return async(ctx, next) => {
    // ctx.logger.info('==>> begin, report cost time');
    ctx.cwLogger.info('==>> begin, report cost time');
    const startTime = Date.now();
    await next();
    // 上报请求时间
    // ctx.logger.info(Date.now() - startTime + 'ms', '<<== end, report cost time');
    ctx.cwLogger.info(Date.now() - startTime + 'ms', '<<== end, report cost time');
  }
}