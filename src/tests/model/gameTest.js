var expect = require("expect.js");
var Game = require("../../model/GameModel.js6").default;
function GameTest(){
    this.game = new Game();
    var gm = this.game;
    it("Create simple Game instance", function() { 
        expect(gm).to.be.an(Object);
    });
    it("Game having properties", function() {
        expect(gm.props).to.be.an(Object);
    });
    this.isNotStarted();
    this.checkScore(0);
};
GameTest.prototype.isNotStarted=function(){
    var gm = this.game;
    it("Game is not started", function() {
        expect(gm.isStarted()).to.eql(false);
        expect(gm.getScore()).to.eql(0);
    });
};
GameTest.prototype.isStarted=function(){
    var gm = this.game;
    it("Game is not started", function() {
        expect(gm.isStarted()).to.eql(false);
        expect(gm.getNumberOfPlayers()).not.to.eql(0);
    });
};
GameTest.prototype.startGame=function(){
    var gm = this.game;
    it("start game", function() {
        expect(gm.start()).to.eql(true);
        expect(gm.isStarted()).to.eql(true);
    });
    it("Game and players score is raz", function() {
        expect(gm.getScore()).to.eql(0);
        for(var i in gm.players){
            expect(gm.players[i].getScore()).to.eql(0);
        }
    });
    
};
GameTest.prototype.stopGame=function(){
    var gm = this.game;
    it("stop game", function() {
        expect(gm.stop()).to.eql(true);
    });
};
GameTest.prototype.checkScore=function(score){
    var gm = this.game;
    it("stop game", function() {
        expect(gm.getScore()).to.eql(score);
    });
};
GameTest.prototype.addPlayer=function(psPlayerName){
    var loThis = this;
    var gm = this.game;
    var player = gm.addPlayer(psPlayerName);
    it(psPlayerName + "join the game", function() {
        expect(player).to.be.an(Object);
        expect(player.props).to.be.an(Object);
    });
    return player;
};
GameTest.prototype.cantAddPlayer=function(psPlayerName){
    var gm = this.game;
    it(psPlayerName + " can't join the game",  function() {
        expect(gm.addPlayer(psPlayerName)).to.eql(false);
    });
};
GameTest.prototype.add2SameNamedPlayer=function(psPlayerName){
    var loThis = this;
    var gm = this.game;
    var res = {player1: null, player2:null};
    it(psPlayerName + " join the game", function() {
        res.player1 = gm.addPlayer(psPlayerName);
        expect(res.player1).to.be.an(Object);
    });
    it(psPlayerName + " join the game", function() {
        res.player2 = gm.addPlayer(psPlayerName);
        expect(res.player2).to.be.an(Object);
    });
    return res;
};
GameTest.prototype.getScore=function(psPlayerName){
    return this.game.getScore();
};
module.exports=GameTest;
