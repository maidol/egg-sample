'use strict;'

module.exports = app => {
  class HomeController extends app.Controller {
    async index(ctx) {
      // const ctx = this.ctx;
      ctx.consoleLogger.info('hello world');
      ctx.cwLogger.info('hello world');
      ctx.body = 'hello world';
    }
  }
  return HomeController;
};