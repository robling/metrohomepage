var app = require('koa')();
var homepage = require('../index.js').generate;

// Static files
var path = require('path');
app.use(require('koa-static')(path.resolve(__dirname, '../public')));
app.use(function *(){
    this.type ='text/html'
    this.body = yield homepage;
});

app.listen(3000);
