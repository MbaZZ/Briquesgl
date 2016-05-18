var Game = require('../metier/Game.js6');

function GameConfigController(){
    this.gameModel = new Game.default();
}
GameConfigController.prototype.addPlayer=function(poPlayerModel){
    this.gameModel.addPlayer(poPlayerModel);
};
module.exports=new GameConfigController();
