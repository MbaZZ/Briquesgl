 var express = require('express')
   , stylus = require('stylus')
    , nib = require('nib')
    , routes = require('./routes');

var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
//app.use(express.logger('dev'))
/*
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))*/
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/../../../build/public'))
app.use(express.static(__dirname + '/../../../node_modules/bootstrap/dist/'))
app.use(express.static(__dirname + '/../../../node_modules/jquery/dist/'))
app.get('/', routes.index);

app.listen(3000, function(){
  //console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
