'use strict;'

module.exports = app => {
  return class HomeController extends app.Controller {
    async index(ctx) {
      // const ctx = this.ctx;
      // ctx.consoleLogger.info('hello world');
      ctx.body = 'egg hello world';
    }
    async hello(ctx) {
      ctx.success('hello world');
    }
  }
};