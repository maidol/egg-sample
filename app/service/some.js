module.exports = app => {
  return class SomeService extends app.Service {
    async list() {
      const rule = this.app.config.robot.ua;
    }
  }
}