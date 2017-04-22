/*--app.js为项目的入口文件--*/

//使用严格模式
'use strict'

/*
 * 引入koa模块
 * 引入koa路由模块
 * 引入reqverify中间件
 * 引入acctoken中间件
 * 引入config项目配置文件
 * 引入replyhandler模块
 */
const[koa,router,reqverify,acctoken,config,reply]=[require('koa'),require('koa-router'),require('./wechat/reqverify'),require('./wechat/acctoken'),require('./config'),require('./wechat/replyhandler')];

//实例化一个koa对象
const app=new koa();
//app.use(router(app));
const route=new router();
route.get('/movie',function(ctx,next){
  this.body='hello movie';
})

app.use(route.routes());
/*app.get('/movie',function *(next){
  this.body='hello movie';
  return next;
})*/

//使用acctoken中检验验证access_token
app.use(acctoken(config.wechat));
//使用reqverify中间件验证请求
app.use(reqverify(config.wechat,reply.reply));

//监听80端口
app.listen(80);
console.log('server is running in port:80');