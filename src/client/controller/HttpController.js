function HttpController(){
    this.gameConfControl = require('./GameConfigController.js');
    this.playerControl= require('./PlayerInGameController.js');
}

HttpController.prototype.config=function(){
    //this.playerControl.winBall();
    this.gameConfControl.addPlayer(this.playerControl.playerModel);
};

HttpController.prototype.inGame=function(){
};
module.exports = new HttpController();
