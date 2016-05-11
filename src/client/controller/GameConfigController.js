//var gameModel = require('../metier/Game.js');
function GameConfigController(){
    //this.gameModel = gameModel.getInstance(); 
    var gameModel = require('../metier/Game.js');
}
GameConfigController.prototype.addPlayer=function(poPlayerModel){
    this.gameModel.addPlayer(poPlayerModel);
};
module.exports=new GameConfigController();
