var expect = require("expect.js");
var GameTesteur = require("./model/gameTest.js");
var PlayerTesteur = require("./model/playerTest.js");

function ModelTests(){
    this.gameTesteur;
} 
ModelTests.prototype.testInstance = function(){
    this.gameTesteur = new GameTesteur();
    this.gameTesteur.isNotStarted();
};
ModelTests.prototype.testAddPlayer= function(){
    this.gameTesteur.stopGame();
    this.gameTesteur.addPlayer("Phil");
    this.gameTesteur.add2SameNamedPlayer("Raoul");
    this.gameTesteur.startGame();
    this.gameTesteur.cantAddPlayer("Joh l'incuste");
    this.gameTesteur.stopGame();
};
ModelTests.prototype.testPlayer= function(PlayerName){
    this.gameTesteur.stopGame();
    var player = new PlayerTesteur(this.gameTesteur, this.gameTesteur.addPlayer('René'));
    player.cannotWinPoints(100);
    this.gameTesteur.startGame();
    player.winPoints(100);
    this.gameTesteur.stopGame();
};
module.exports = new ModelTests();
