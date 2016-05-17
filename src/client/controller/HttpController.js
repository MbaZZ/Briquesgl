
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
