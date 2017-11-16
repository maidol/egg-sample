const promiseCallback = function pcb(functionName, params) {
	const self = this;
	params = Array.prototype.slice.call(params, 0);
	return new Promise(((resolve, reject) => {
		params.push(function p(err) {
			const args = Array.prototype.slice.call(arguments, 1);
			if (err) {
				return reject(err);
			}

			return resolve.apply(this, [args]);
		});

		self[functionName].apply(self, params);
	}));
};

module.exports = {
	promiseCallback,
};