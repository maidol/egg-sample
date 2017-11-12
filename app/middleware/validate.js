'use strict;'

// joi
module.exports = (options, app) => {
  return async(ctx, next) => {
    // 验证请求参数
    ctx.cwLogger.info('joi validate...');
    for (const key in options.schemas) {
      if (options.schemas.hasOwnProperty(key)) {
        const schema = options.schemas[key];
        ctx.cwLogger.info(key, ctx.request[key]);
        const { error, value } = app.Joi.validate(ctx.request[key], schema);
        if(error){
          let message = error.details[0].message;
          // ctx.throw(422, message);
          ctx.body = message;
          return 
        }
      }
    }
    await next();
    // TODO: 验证返回数据
  }
}