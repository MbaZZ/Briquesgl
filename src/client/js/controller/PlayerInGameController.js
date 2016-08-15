var Player = require('../model/Player.js6');
var Scene3D = require('../views/3d/objects/BriqueScene.js6').default;

function PlayerInGameController(){ 
    this.playerModel = new Player.default();
    this.scene = new Scene3D();

}
PlayerInGameController.prototype.winBall=function(){
   console.log('le joueur '+this.playerModel.getPseudo()+' vient de gagner 1 balle !');
   this.playerModel.winBall();
};
PlayerInGameController.prototype.useBall=function(){
   console.log('le joueur '+this.playerModel.getPseudo()+' vient de lancer 1 balle !');
   this.playerModel.useBall();
};
PlayerInGameController.prototype.winPouvoir=function(pCode){
   console.log('le joueur '+this.playerModel.getPseudo()+' vient de gagner 1 pouvoir '+pCode+' !');
   this.playerModel.winPouvoir(pCode);
};
PlayerInGameController.prototype.usePouvoir=function(pCode){
   console.log('le joueur '+this.playerModel.getPseudo()+' vient de d\'utiliser 1 pouvoir '+pCode+' !');
   this.playerModel.usePouvoir(pCode);
};
module.exports = new PlayerInGameController();
