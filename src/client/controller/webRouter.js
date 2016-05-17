var httpC = require('./HttpController.js');
var $ = require('jquery');
// A $( document ).ready() block.
$( document ).ready(function() {
    console.log("deb loading HTTPController");
    
    httpC.config();

    console.log("fin loading HTTPController");
});
