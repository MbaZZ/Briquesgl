var expect = require("expect.js");
function PlayerTest(game, player){
    this.game = game;
    this.player = player;
    it("Player have property", function() {
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
};
PlayerTest.prototype.useBall=function(){
};
PlayerTest.prototype.cantUseBall=function(){
};
PlayerTest.prototype.winPouvoir=function(){
};
PlayerTest.prototype.usePouvoir=function(){
};
PlayerTest.prototype.cantUsePouvoir=function(){
};
PlayerTest.prototype.addPlayer=function(){
};
module.exports=PlayerTest;
