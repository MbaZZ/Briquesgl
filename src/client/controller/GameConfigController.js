var Game = require('../metier/Game.js6');

//var gameModel = require('../metier/Game.js');
function GameConfigController(){
    //this.gameModel = gameModel.getInstance(); 
    this.gameModel =   Game.instance;
    console.log('iiiii');
    //var gameModel = require('../metier/Game.js');
}
GameConfigController.prototype.addPlayer=function(poPlayerModel){
    this.gameModel.addPlayer(poPlayerModel);
};
module.exports=new GameConfigController();
