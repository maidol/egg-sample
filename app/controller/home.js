'use strict;'

module.exports = app => {
  class HomeController extends app.Controller {
    async index(ctx) {
      // const ctx = this.ctx;
      app.consoleLogger.info('hello world');
      app.cwLogger.info('hello world');
      ctx.body = 'hello world';
    }
  }
  return HomeController;
};