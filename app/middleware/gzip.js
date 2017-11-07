'use strict;'

const isJSON = require('koa-is-json');
const zlib = require('zlib');

module.exports = (options, app) => {
  return async(ctx, next) => {
    await next();
    // ctx.logger.info('gzip', ctx.body, ctx.get('Accept-Encoding'));
    ctx.cwLogger.info('gzip', ctx.body, ctx.get('Accept-Encoding'));
    // 后续中间件执行完成后将响应体转换成 gzip
    let body = ctx.body;
    if (!body) return;
    if (ctx.get('Accept-Encoding') && ctx.get('Accept-Encoding').indexOf('gzip') > -1) {
      ctx.logger.info('to set gzip');
      if (isJSON(body)) body = JSON.stringify(body);
      // 设置 gzip body，修正响应头
      const stream = zlib.createGzip();
      stream.end(body);
      ctx.body = stream;
      ctx.set('Content-Encoding', 'gzip');
    }
  }
}