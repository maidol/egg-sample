const Connection = require('./connection.js');
const { inherits } = require('util');
const { promiseCallback } = require('./helper');

const poolConnection = function pc(_connection) {
	this.connection = _connection;

	Connection.call(this, null, _connection);
};

inherits(poolConnection, Connection);

poolConnection.prototype.release = function release() {
	return promiseCallback.apply(this.connection, ['release', arguments]);
};

poolConnection.prototype.destroy = function destroy() {
	return promiseCallback.apply(this.connection, ['destroy', arguments]);
};

module.exports = poolConnection;