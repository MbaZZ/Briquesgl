
var player = require('./Player');
Game.instance = null;
function Game(){
    this.props = {
        "players":[],
        "scoreCumule":0,
        "statut":"NotStarted"
    };
}
Game.prototype.isStarted=function(){
    return this.props.statut == "started"; 
};
Game.prototype.getNumberOfPlayers=function(){
    return this.props.players.length; 
};
Game.prototype.getScore=function(){
    return this.props.scoreCumule; 
};
module.exports={"getInstance":function(){
    if(Game.instance == null) Game.instance = new Game();
    return Game.instance;
}}
