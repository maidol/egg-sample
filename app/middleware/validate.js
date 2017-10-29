'use strict;'

// joi
module.exports = (options, app) => {
  return async(ctx, next) => {
    ctx.logger.info('joi validate...');
    await next();
  }
}