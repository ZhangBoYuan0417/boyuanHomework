const route = require('./server/route/index')
const koa = require('koa');
const koaRouter = require('koa-router');
const json = require('koa-json');
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');
const koa2HistoryApiFallback = require('koa2-history-api-fallback');
const cors = require('koa-cors');
const jwtKoa = require('koa-jwt');

const app = new koa();
app.use(cors())
const router = new koaRouter();

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(jwtKoa('boyuan_homework').unless({
    path: [/^\/boyuan\/login/]
  }))

app.use(function* (next){
  let start = new Date;
  yield next;
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.on('error', function(err, ctx){
  console.log('server error', err);
});

router.use('/boyuan', route.routes())

app.use(router.routes())
app.use(koa2HistoryApiFallback())
app.use(serve(path.resolve('dist')))

app.listen(8889, () => {
  console.log('Koa is listening in 8889');
});

module.exports = app;