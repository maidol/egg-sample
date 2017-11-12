'use strict;'

module.exports = app => {
  app.get('/', app.middlewares.validate({
    schemas: {
      headers: app.Joi.object().unknown(),
      body: app.Joi.object().unknown(),
      query: app.Joi.object().keys({
        account: app.Joi.string().example('12345678901').description('邮箱/手机号码').required(),
        password: app.Joi.string().min(3).max(24).example('1234').description('密码').required()
      })
    },
    joi: {}
  }, app), app.controller.home.index);
  app.get('/news', app.controller.news.list);
  app.post('/mock/post', app.controller.mock.post);
}