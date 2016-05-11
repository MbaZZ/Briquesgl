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
Player.prototype.getPseudo=function(){
    return this.props.pseudo;
};
Player.prototype.winBall=function(){
   this.props.balles.addItem(balleModel.create.fromProps({"proprietaire":this})); 
};
Player.prototype.useBall=function(){
    var loBM = this.props.balles.useItem(); 
};
Player.prototype.winPouvoir=function(pCode){
   this.props.pouvoirs.addItem(Pouvoir.create.fromProps({"proprietaire":this, "code":pCode})); 
};
Player.prototype.usePouvoir=function(pCode){
    var loBM = this.props.pouvoirs.useItem(); 
};
module.exports = new Player();
