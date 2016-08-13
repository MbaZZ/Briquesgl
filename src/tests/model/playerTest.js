var expect = require("expect.js");
function PlayerTest(game, player){
    this.game = game;
    this.player = player;
    it("Player have properties", function() {
        expect(player.props).to.be.an(Object);
    });
}
PlayerTest.prototype.winPoints=function(piNb){
    var player = this.player;
    var game = this.game;
    var gameBefScore = game.getScore();
    var playerBefScore= player.getScore();
    it("Player win points", function() {
        expect(player.marquerPoints(piNb)).to.eql(true);
        expect(player.getScore()).to.eql(playerBefScore + piNb);
        expect(game.getScore()).to.eql(gameBefScore + piNb);
    });
};
PlayerTest.prototype.cannotWinPoints=function(piNb){
    var player = this.player;
    var game = this.game;
    it("Player cannot win points", function() {
        var gameBefScore = game.getScore();
        var playerBefScore= player.getScore();
        expect(player.marquerPoints(piNb)).to.eql(false);
        expect(player.getScore()).to.eql(playerBefScore);
        expect(game.getScore()).to.eql(gameBefScore);
    });
};
PlayerTest.prototype.winBall=function(){
    var player = this.player;
    it("Player win ball", function() {
        var nbBall = player.getNbBalls();
        expect(player.winBall("std")).to.eql(true);
        expect(player.getNbBalls()).to.eql(nbBall + 1);  
    });
};
PlayerTest.prototype.cannotWinBall=function(){
    var player = this.player;
    it("Player can't win ball", function() {
        var nbBall = player.getNbBalls();
        expect(player.winBall("std")).to.eql(false);
        expect(player.getNbBalls()).to.eql(nbBall);  
    });
};
PlayerTest.prototype.useBall=function(){
    var player = this.player;
    it("Player use Ball", function() {
        var nbBall = player.getNbBalls();
        expect(player.winBall()).to.eql(true);
    });
};
PlayerTest.prototype.cannotUseBall=function(){
    var player = this.player;
    it("Player can't use Ball", function() {
        var nbBall = player.getNbBalls();
        expect(player.winBall()).to.eql(false);
        expect(player.getNbBalls()).to.eql(nbBall);  
    });
};
PlayerTest.prototype.winPouvoir=function(){
    var player = this.player;
    it("Player win pouvoir", function() {
        var nbPouvoir = player.getNbPouvoirs();
        expect(player.winPouvoir('superBonus')).to.eql(true);
        expect(player.getNbPouvoirs()).to.eql(nbPouvoir + 1);  
    });
};
PlayerTest.prototype.cannotWinPouvoir=function(){
    var player = this.player;
    it("Player can't win pouvoir", function() {
        var nbPouvoir = player.getNbPouvoirs();
        expect(player.winPouvoir('superBonus')).to.eql(false);
        expect(player.getNbPouvoirs()).to.eql(nbPouvoir);  
    });
};
PlayerTest.prototype.usePouvoir=function(){
    var player = this.player;
    it("Player use pouvoir", function() {
        var nbPouvoir = player.getNbPouvoirs();
        expect(player.usePouvoir('superBonus')).to.eql(true);
        expect(player.getNbPouvoirs()).to.eql(nbPouvoir -1);  
    });
};
PlayerTest.prototype.cannotUsePouvoir=function(){
    var player = this.player;
    it("Player can't use pouvoir", function() {
        var nbPouvoir = player.getNbPouvoirs();
        expect(player.usePouvoir('superBonus')).to.eql(false);
        expect(player.getNbPouvoirs()).to.eql(nbPouvoir);  
    });
};
module.exports=PlayerTest;
