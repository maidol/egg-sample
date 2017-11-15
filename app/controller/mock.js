'use strict;'

module.exports = app => {
  return class MockController extends app.Controller {
    async post({
      request
    }) {
      const {
        body
      } = request;
      this.ctx.body = body;
    }
  }
}