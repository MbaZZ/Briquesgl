var expect = require("expect.js");
var Game = require("../model/GameModel.js6").default;
var PersistModel = require('../model/PersistModel.js6').default;

function ModelTests(){
    this.gameController = new Game();
} 
ModelTests.prototype.testInstance = function(){
    var gm = this.gameController;
    it("Create simple Game instance", function() {
        expect(gm).to.be.an(Object);
    });
    it("Game having properties", function() {
        expect(gm.props).to.be.an(Object);
    });
    it("Game is added in TreeModel Persist", function() {
        //expect().to.be.an(Object);
    });
};
ModelTests.prototype.testInitState = function(){
    var gm = this.gameController;
    it("Game is not started", function() {
        expect(gm.isStarted()).to.eql(false);
        expect(gm.getNumberOfPlayers()).to.eql(0);
        expect(gm.getScore()).to.eql(0);
    });
    
    it("cannot start game with no player", function() {
        expect(gm.start()).to.eql(false);
    });
};
ModelTests.prototype.testAddPlayer= function(){
    var gm = this.gameController;
    it("add player", function() {
        expect(gm.addPlayer('toto')).to.be.an(Object);
    });

    it("rename player if name is already used", function() {
        var player = gm.addPlayer('toto');
        expect(player).to.be.an(Object);
        expect(player.getName()).not.to.eql('toto');
    });

    it("start game", function() {
        expect(gm.start()).to.eql(true);
    });

    it("cannot add player on a started game", function() {
        expect(gm.addPlayer('tutu')).to.eql(false);
    });
    
    it("stop game", function() {
        expect(gm.stop()).to.eql(true);
    });

    it("Game is not started", function() {
        expect(gm.isStarted()).to.eql(false);
        expect(gm.getScore()).to.eql(0);
    });
};
ModelTests.prototype.testPlayer= function(){
    var gm = this.gameController;
    var player = null;
    it("add player PlayerTest", function() {
        player = gm.addPlayer('PlayerTest');
        expect(player).to.be.an(Object);

    });
    it("Player have property", function() {
        expect(gm.props).to.be.an(Object);
    });
};
module.exports = new ModelTests();
