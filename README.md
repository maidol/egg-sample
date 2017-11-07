## 对象
------
### - Application(Koa的全局应用对象) { logger, coreLogger, config, Controller, Service, middleware, middlewares }
### - Config { appMiddleware, coreMiddleware }
### - Context { app, logger, coreLogger, service, request, response, helper }
### - Controller { ctx, app, config, logger }
### - Service { ctx, app, config, logger, service }
### - Logger

## 环境变量 NODE_ENV 
------
### - NODE_ENV
### - EGG_SERVER_ENV

## egg日志对象 { agent{ logger, coreLogger }, app{ logger, coreLogger }, context{ logger, coreLogger } }

## cw日志对象 { agent{ cwLogger, consoleLogger }, app{ cwLogger, consoleLogger }, context{ cwLogger, consoleLogger } }

## 中间件
------
### - 框架级别, app.config.coreMiddleware
### - 插件级别
### - 应用级别, 通过配置文件
### - 路由级别
注意：框架和插件加载的中间件会在应用层配置的中间件之前，框架默认中间件不能被应用层中间件覆盖，如果应用层有自定义同名中间件，在启动时会报错

## 单元测试
------
### - 测试用例执行时，应用是以 env: unittest 启动的，读取的配置也是 config.default.js 和 config.unittest.js 合并的结果
### - 运行 npm test 时会自动执行 test 目录下的以 .test.js 结尾的文件（默认 glob 匹配规则 test/**/*.test.js
### - 在编写用例时往往想单独执行正在编写的用例，可以通过以下方式指定特定用例文件
```bash
TESTS=test/x.test.js npm test
```
### - 指定 reporter
```bash
TEST_REPORTER=dot npm test
```
### - 指定用例超时时间, 默认30s
```bash
TEST_TIMEOUT=5000 npm test
```
### - 通过 argv 方式传参; egg-bin test 除了环境变量方式，也支持直接传参，支持 mocha 的所有参数，参见: [mocha usage](https://mochajs.org/#usage)
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
### - 执行顺序。每个用例(describe)会按 before -> beforeEach -> it -> afterEach -> after 的顺序执行，而且可以定义多个
##  代码覆盖率
------
### - egg-bin 已经内置了 [nyc](https://github.com/istanbuljs/nyc) 来支持单元测试自动生成代码覆盖率报告
```bash
npm run cov
```
### - 环境配置
```txt
和 test 命令一样，cov 命令执行时，应用也是以 env: unittest 启动的，读取的配置也是 config.default.js 和 config.unittest.js 合并的结果
```