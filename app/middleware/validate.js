'use strict;'

// joi
module.exports = (options, app) => {
  return async(ctx, next) => {
    ctx.cwLogger.info('joi validate...');
    await next();
  }
}