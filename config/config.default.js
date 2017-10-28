exports.keys = '123456';

exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks'
  }
}

exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0'
}

exports.middleware = [
  'robot'
];

exports.robot = {
  name: 'robot',
  ua: [
    /Baiduspider/i
  ]
}