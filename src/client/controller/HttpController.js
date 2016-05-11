var $ = require('jquery');
// A $( document ).ready() block.
$( document ).ready(function() {
    console.log("deb loading HTTPController");
    
    var httpC = module.exports;
    httpC.config();

    console.log("fin loading HTTPController");
});

function HttpController(){
    this.gameConfControl = require('./GameConfigController.js');
    this.playerControl= require('./PlayerInGameController.js');
}

HttpController.prototype.config=function(){
    console.log('config');
    this.playerControl.winBall();
};

HttpController.prototype.inGame=function(){
};
module.exports = new HttpController();
