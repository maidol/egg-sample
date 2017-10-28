module.exports = app => {
  class HomeController extends app.Controller {
    async index() {
      const ctx = this.ctx;
      ctx.body = 'hello world';
    }
  }
  return HomeController;
};