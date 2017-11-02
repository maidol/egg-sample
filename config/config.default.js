'use strict;'

module.exports = app => {
  return {
    listen: {
      port: 7001,
      hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
    },
    keys: '123456',
    security: {
      csrf: false
    },
    i18n: {
      defaultLocale: 'zh-CN',
      // 优先级从高到低
      // query: /?locale=en-US
      // cookie: locale=zh-TW
      // header: Accept-Language: zh-CN,zh;q=0.5
      queryField: 'locale',
      cookieField: 'locale',
      // Cookie 默认一年后过期， 如果设置为 Number，则单位为 ms
      cookieMaxAge: '1y',
    },
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.tpl': 'nunjucks'
      }
    },
    news: {
      pageSize: 5,
      serverUrl: 'https://hacker-news.firebaseio.com/v0'
    },
    middleware: [
      'errorHandler',
      'robot',
      'compress'
    ],
    robot: {
      name: 'robot',
      ua: [
        /Baiduspider/i
      ]
    },
    compress: {
      enable: false,
      // match: '', // 字符串/正则/函数
      // ignore: '', // 字符串/正则/函数
      threshold: 1
    },
    logger: {
      // dir: require('path').join(app.baseDir, 'my/logs')
      level: 'info',
      consoleLevel: 'info'
    },
    // 只对 /api 前缀的 url 路径生效
    errorHandler: {
      match: '/api',
    },
  }
}