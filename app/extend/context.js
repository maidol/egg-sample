'use strict;'

module.exports = {
  test1(){
    return 'test1';
  },
  test2(){
    return 'test2';
  },
  get cwLogger() {
    const app = this.app;
    return app.cwLogger;
  },
  get consoleLogger() {
    const app = this.app;
    return app.consoleLogger;
  },
  getLogger(name) {
    return this.app[name];
  }
}