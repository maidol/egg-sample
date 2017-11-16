const mysql = require('mysql');
const { promiseCallback } = require('./helper');

/**
 * Constructor
 * @param {object} config - The configuration object
 * @param {object} _connection - Mysql-Connection, only used internaly by the pool object
 */
const connection = function c(config, _connection) {
	const self = this;
	const connect = function conn(resolve, reject) {
		if (_connection) {
			self.connection = _connection;
			resolve();
		} else {
			self.connection = mysql.createConnection(self.config);
			self.connection.connect((err) => {
					if (err) {
						self.connection.err = err;
						if (typeof reject === 'function') {
							return reject(err);
						} 
							setTimeout(() => {
								connect();
							}, 2000);
							// return;
					} else {
						delete self.connection.err;
						if (typeof resolve === 'function') {
							return resolve();
						}
					}
				});

			self.connection.on('error', (err) => {
				console.log('db error', err);
				self.connection.err = err;
				if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
					connect();
				}
			});
		}
	};

	this.config = config;

	return new Promise(((resolve, reject) => {
		connect(
			() => resolve(self),
			err => reject(err)
		);
	}));
};

connection.prototype.query = function query(sql, values) {
	return promiseCallback.apply(this.connection, ['query', arguments]);
};

connection.prototype.beginTransaction = function beginTransaction() {
	return promiseCallback.apply(this.connection, ['beginTransaction', arguments]);
};

connection.prototype.commit = function commit() {
	return promiseCallback.apply(this.connection, ['commit', arguments]);
};

connection.prototype.rollback = function rollback() {
	return promiseCallback.apply(this.connection, ['rollback', arguments]);
};

connection.prototype.changeUser = function changeUser(data) {
	return promiseCallback.apply(this.connection, ['changeUser', arguments]);
};

connection.prototype.ping = function ping(data) {
	return promiseCallback.apply(this.connection, ['ping', arguments]);
};

connection.prototype.statistics = function statistics(data) {
	return promiseCallback.apply(this.connection, ['statistics', arguments]);
};

connection.prototype.end = function end(data) {
	return promiseCallback.apply(this.connection, ['end', arguments]);
};

connection.prototype.destroy = function destroy() {
	this.connection.destroy();
};

connection.prototype.pause = function pause() {
	this.connection.pause();
};

connection.prototype.resume = function resume() {
	this.connection.resume();
};

connection.prototype.escape = function escape(value) {
	return this.connection.escape(value);
};

connection.prototype.escapeId = function escapeId(value) {
	return this.connection.escapeId(value);
};

connection.prototype.format = function format(sql, values) {
	return this.connection.format(sql, values);
};

module.exports = connection;