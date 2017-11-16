module.exports = {
	formatTime(time) {
		return 'formatTime';
	},
	get test() {
		return 'test logger';
	},
	promiseCallback(functionName, params) {
		const self = this;
		params = Array.prototype.slice.call(params, 0);
		return new Promise(((resolve, reject) => {
			params.push((err, ...args) => {
				// const args = Array.prototype.slice.call(arguments, 1);
				if (err) {
					return reject(err);
				}

				return resolve.apply(this, [args]);
			});

			self[functionName](...params).bind(self);
		}));
	}
};