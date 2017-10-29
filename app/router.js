'use strict;'

module.exports = app => {
  app.get('/', app.middlewares.validate(), app.controller.home.index);
  app.get('/news', app.controller.news.list);
}