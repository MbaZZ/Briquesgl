var gameModel = require('../metier/Game.js');
function GameConfigController(){
    this.gameModel = gameModel.getInstance(); 
}
GameConfigController.prototype.addPlayer=function(poPlayerModel){
    this.gameModel.addPlayer(poPlayerModel);
};
module.exports=new GameConfigController();
