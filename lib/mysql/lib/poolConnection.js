let Connection = require('./connection.js');
let inherits = require('util').inherits;
let promiseCallback = require('./helper').promiseCallback;

let poolConnection = function (_connection) {
	this.connection = _connection;

	Connection.call(this, null, _connection)
}

inherits(poolConnection, Connection);

poolConnection.prototype.release = function () {
	return promiseCallback.apply(this.connection, ['release', arguments]);
};

poolConnection.prototype.destroy = function () {
	return promiseCallback.apply(this.connection, ['destroy', arguments]);
};

module.exports = poolConnection;