'use strict;'

module.exports = app => {
  return class User extends app.Service {
    async get(name) {
      if (name === 'king') return await Promise.resolve({
        name: 'king'
      });
      return await Promise.resolve(null);
    }
    async list() {
      let conn;
      let {ctx} = this;
      try {
        const pool = app.dbpool('eggsample');
        const [rows, fields] = await pool.query('select * from user');
        const [result] = await app.beginTransaction('eggsample', async(tran) => {
          await tran.query('insert into user set ?;', { name: 'king1' });
          const sql = tran.format('update user set ? where ?;', [{ name: 'king3' }, { id: 13 }]);
          let[result] = await tran.query(sql);
          return [result];
        });
        return result;
      } catch (error) {
        ctx.cwLogger.error(error);
      }
    }
  };
};