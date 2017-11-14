'use strict;'

module.exports = app => {
  return class UserController extends app.Controller {
    async list(ctx) {
      // ctx.cwLogger.info('user list');
      ctx.body = await ctx.service.user.list();
    }
  }
};