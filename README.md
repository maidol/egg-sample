## 对象
------
### - Application { logger, coreLogger, config, Controller, Service, middleware, middlewares }
### - Config { appMiddleware, coreMiddleware }
### - Context { app, logger, coreLogger, service, request, response, helper }
### - Controller { ctx, app, config, logger }
### - Service { ctx, app, config, logger, service }
### - Logger

## 环境变量 NODE_ENV 
------
### - NODE_ENV
### - EGG_SERVER_ENV

## 中间件
------
### - 框架级别, app.config.coreMiddleware
### - 插件级别
### - 应用级别, 通过配置文件
### - 路由级别
注意：框架和插件加载的中间件会在应用层配置的中间件之前，框架默认中间件不能被应用层中间件覆盖，如果应用层有自定义同名中间件，在启动时会报错