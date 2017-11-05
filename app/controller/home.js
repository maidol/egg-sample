'use strict;'

module.exports = app => {
  class HomeController extends app.Controller {
    async index(ctx) {
      // const ctx = this.ctx;
      // ctx.logger.info('info');
      ctx.body = 'hello world';
    }
  }
  return HomeController;
};