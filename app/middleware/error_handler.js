'use strict;'

module.exports = (options, app) => {
  return async(ctx, next) => {
    const apiCode = ctx.app.apiCode;
    try {
      await next();
    } catch (e) {
      ctx.body = {
        ret: apiCode.retCodeEnum.serverError,
        errcode: apiCode.errCodeEnum.autoSnapError,
        msg: "系统繁忙..."
      }
      ctx.cwLogger.error(e);
    }
    // try {
    //   await next();
    // } catch (err) {
    //   // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
    //   ctx.app.emit('error', err, ctx);
    //   const status = err.status || 500;
    //   // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
    //   const error = status === 500 && ctx.app.config.env === 'prod'
    //     ? 'Internal Server Error'
    //     : err.message;
    //   // 从 error 对象上读出各个属性，设置到响应中
    //   ctx.body = { error };
    //   if (status === 422) {
    //     ctx.body.detail = err.errors;
    //   }
    //   ctx.status = status;
    // }
  };
};