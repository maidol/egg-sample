'use strict;'

module.exports = (options, app) => {
  return async(ctx, next) => {
    const apiCode = ctx.app.apiCode;
    try {
      await next();
      if (ctx.response.status === 404 && ctx.body === undefined) {
        ctx.body = ctx.buildReturnObject(apiCode.retCodeEnum.success,
          apiCode.errCodeEnum.notReturnData, 'success', null)
      }
    } catch (e) {
      ctx.cwLogger.error(e,'current url -->>', ctx.url);

      if (e === undefined || e === null) {
        e = new Error("未定义的错误")
      }
      if (e.retCode === undefined) {
        e.retCode = apiCode.retCodeEnum.serverError
      }
      if (e.errCode === undefined) {
        e.errCode = apiCode.errCodeEnum.autoSnapError
      }

      ctx.body = ctx.buildReturnObject(e.retCode, e.errCode, e.message || "系统繁忙...");
    }
  }
};