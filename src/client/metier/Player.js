var inventaire = require('./utils/Inventaire');
var balleModel = require('./Ball');

function Player(){
    this.props = {
        "pseudo":"pasDeNom",
        "score":0,
        "bonus":0,
        "balles": inventaire.create(),
        "pouvoirs":inventaire.create(),
        "partieEnCours":null
    };
}

Player.prototype.winBall=function(){
   this.props.balles.addItem(ball.create.fromProps({"proprietaire":this})); 
   console.log('le joueur '+this.props.pseudo+' vient de gagner 1 balle !');
};
Player.prototype.useBall=function(){
   console.log('le joueur '+this.props.pseudo+' vient de lancer 1 balle !');
    var loBM = this.props.balles.useItem(); 
};
Player.prototype.winPouvoir=function(pCode){
   this.props.pouvoirs.addItem(Pouvoir.create.fromProps({"proprietaire":this, "code":pCode})); 
   console.log('le joueur '+this.props.pseudo+' vient de gagner 1 pouvoir '+pCode+' !');
};
Player.prototype.usePouvoir=function(pCode){
   console.log('le joueur '+this.props.pseudo+' vient de d\'utiliser 1 pouvoir '+pCode+' !');
    var loBM = this.props.pouvoirs.useItem(); 
};
