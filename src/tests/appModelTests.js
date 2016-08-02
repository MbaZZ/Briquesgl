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
    var playerTesteur = new PlayerTesteur(this.gameTesteur, this.gameTesteur.addPlayer('René'));
    playerTesteur.cannotWinPoints(100);
    playerTesteur.cannotWinPoints(100);
    playerTesteur.cannotWinBall();
    playerTesteur.cannotUseBall();
    playerTesteur.cannotWinPouvoir();
    playerTesteur.cannotUsePouvoir();
    this.gameTesteur.startGame();
    playerTesteur.winPoints(100);
    playerTesteur.winBall();
    playerTesteur.useBall();
    playerTesteur.winPouvoir();
    playerTesteur.usePouvoir();
    this.gameTesteur.stopGame();
    playerTesteur.cannotWinPoints(100);
    playerTesteur.cannotWinBall();
    playerTesteur.cannotUseBall();
    playerTesteur.cannotWinPouvoir();
    playerTesteur.cannotUsePouvoir();
};
module.exports = new ModelTests();
