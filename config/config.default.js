'use strict;'

module.exports = app => {
  return {
    listen: {
      port: 7001,
      hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
    },
    keys: '123456',
    // security: {
    //   csrf: false
    // },
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
  }
}