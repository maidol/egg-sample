## cw egg-sample
[基于egg框架](https://eggjs.org/zh-cn/)

## 启动
```bash
npm run dev # 开发环境
npm run test # 单元测试
npm run cov # 代码覆盖率
npm run start # 生产环境
```
## 组件
- 日志组件[cw-logger](https://github.com/maidol/cw-logger)
- 数据库[mysql](https://github.com/mysqljs/mysql)  
mysql组件添加了promise的封装层, 调用 const [result, fields] = await pool.query(...) 方法返回的数据类型为数组
- 数据校验[joi](https://github.com/hapijs/joi)

## 调试
vscode开发环境下, f5

## 一些代码规范风格 [es6](http://es6.ruanyifeng.com/#docs/style)
- 使用tab缩进, 设置制表符大小为2
- 块级作用域
>>- 使用let取代var
>>- 优先使用const常量定义, 所有函数都应该设置为常量
- 字符串
>>- 静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号
- 解构赋值
- 数组
>>- 使用扩展运算符（...）拷贝数组
```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```
- 函数
>>- 尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this
```javascript
const obj = {
  t1: function(){
    const d1 = function(){
      console.log('d1', this);
    }
    const d2 = () => {
      console.log('d2', this);
    }
    d1();  // this 不是 obj
    d2();  // this = obj
  }
}
obj.t1();
```
>>- 使用默认值语法设置函数参数的默认值
```javascript
// bad
function handleThings(opts) {
  opts = opts || {};
}

// good
function handleThings(opts = {}) {
  // ...
}
```
- Class
>>- 总是用 Class，取代需要 prototype 的操作
- import/export, 目前此框架未支持此语法特性
- 安装格式化工具 js-beautify for VS Code
- eslint
>>- 一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码
```bash
npm i -g eslint
npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
```
>>- 新建一个.eslintrc文件，配置 ESLint
```javascript
{
  "extends": "standard",
  "rules": {
    "semi": [ 0, "never"]
    // "semi-spacing": 0
  }
}
```
```bash
eslint index.js
```

## egg对象
------
- Application(Koa的全局应用对象)  
{ logger, coreLogger, config, Controller, Service, middleware, middlewares }
- 配置Config  
{ appMiddleware, coreMiddleware }
- Context  
{ app, logger, coreLogger, service, request, response, helper }
- Controller  
{ ctx, app, config, logger }
- Service  
{ ctx, app, config, logger, service }
- Logger  
>>- cw日志对象, 应用日志统一记录在app.log文件  
{ agent{ cwLogger, consoleLogger }, app{ cwLogger, consoleLogger }, context{ cwLogger, consoleLogger } }
>>- egg日志对象, egg框架内置, 应用开发一般不会用到  
{ agent{ logger, coreLogger }, app{ logger, coreLogger }, context{ logger, coreLogger }}

## 环境变量 NODE_ENV 
------
- NODE_ENV
- EGG_SERVER_ENV

## 中间件级别
------
- 框架级别, app.config.coreMiddleware
- 插件级别
- 应用级别, 通过配置文件
- 路由级别  
注意：框架和插件加载的中间件会在应用层配置的中间件之前，框架默认中间件不能被应用层中间件覆盖，如果应用层有自定义同名中间件，在启动时会报错

## 单元测试
------
```bash
npm run test
```
- 测试用例执行时，应用是以 env: unittest 启动的，读取的配置也是 config.default.js 和 config.unittest.js 合并的结果
- 运行 npm run test 时会自动执行 test 目录下的以 .test.js 结尾的文件（默认 glob 匹配规则 test/**/*.test.js
- 在编写用例时往往想单独执行正在编写的用例，可以通过以下方式指定特定用例文件
```bash
TESTS=test/x.test.js npm test
```
- 指定 reporter
```bash
TEST_REPORTER=dot npm test
```
- 指定用例超时时间, 默认30s
```bash
TEST_TIMEOUT=5000 npm test
```
- 通过 argv 方式传参; egg-bin test 除了环境变量方式，也支持直接传参，支持 mocha 的所有参数，参见: [mocha usage](https://mochajs.org/#usage)
```bash
$ # npm 传递参数需额外加一个 `--`，参见 https://docs.npmjs.com/cli/run-script
$ npm test -- --help
$
$ # 等同于 `TESTS=test/**/test.js npm test`，受限于 bash，最好加上双引号
$ npm test "test/**/test.js"
$
$ # 等同于 `TEST_REPORTER=dot npm test`
$ npm test -- --reporter=dot
$
$ # 支持 mocha 的参数，如 grep / require 等
$ npm test -- -t 30000 --grep="should GET"
```
- 执行顺序。每个用例(describe)会按 before -> beforeEach -> it -> afterEach -> after 的顺序执行，而且可以定义多个

##  代码覆盖率
------
- egg-bin 已经内置了 [nyc](https://github.com/istanbuljs/nyc) 来支持单元测试自动生成代码覆盖率报告
```bash
npm run cov
```
- 环境配置
```txt
和 test 命令一样，cov 命令执行时，应用也是以 env: unittest 启动的，读取的配置也是 config.default.js 和 config.unittest.js 合并的结果
```