'use strict;'

module.exports = app => {
  return class User extends app.Service {
    async get(name) {
      if(name === 'king') return await Promise.resolve({ name: 'king' });
      return await Promise.resolve(null);
    }
  };
};