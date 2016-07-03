var express = require('express')
var app = express()

app.use(express.static(__dirname + '/../../../build/client/'))
app.use(express.static(__dirname + '/../../../node_modules/bootstrap/dist/'))
app.use(express.static(__dirname + '/../../../node_modules/jquery/dist/'))

/*app.get('/', function (req, res) {
  res.send('Hello World') 
})*/

app.listen(3000)
