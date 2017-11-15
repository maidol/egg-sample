'use strict';

module.exports = (options, app) => {
	return async(ctx, next) => {
		const startTime = Date.now();
		// 计时开始
		ctx.cwLogger.info(`${ctx.url} ==>> begin request`);
		await next();
		// 上报请求时间
		ctx.cwLogger.info(`${ctx.url} <<== end request, ${Date.now() - startTime}ms`);
	};
};