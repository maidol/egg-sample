'use strict;'

module.exports = {
  formatTime(time) {
    return 'formatTime';
  },
  get test() {
    return 'test logger';
  },
  promiseCallback(functionName, params) {
    let self = this;
    params = Array.prototype.slice.call(params, 0);
    return new Promise(function (resolve, reject) {
      params.push(function (err) {
        let args = Array.prototype.slice.call(arguments, 1);
        if (err) {
          return reject(err);
        }

        return resolve.apply(this, [args]);
      });

      self[functionName].apply(self, params);
    });
  }
}