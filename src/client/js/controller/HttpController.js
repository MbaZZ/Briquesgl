function HttpController(){
    this.gameConfControl = require('./GameConfigController.js');
    this.playerControl= require('./PlayerInGameController.js');
}
HttpController.instance = new HttpController();

HttpController.prototype.config=function(){
    return this.gameConfControl.home();
};

HttpController.prototype.inGame=function(){
};
module.exports = new HttpController();
