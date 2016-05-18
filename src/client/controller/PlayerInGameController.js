var Player = require('../metier/Player.js6');

function PlayerInGameController(){ 
    this.playerModel = new Player.default();
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
