//A debug !
var expect = require("expect.js");
var game = require("../client/controller/GameConfigController.js");

function ClientControllerTests(){
    this.gameMetier = game.getInstance();
}
ClientControllerTests.prototype.testInstance = function(){
    var gm = this.gameMetier;
    it("Create simple Game instance", function() {
        expect(gm).to.be.an(Object);
    });
    it("Game having properties", function() {
        expect(gm.props).to.be.an(Object);
    });
    it("Game is a singleton", function() {
        var game2 = game.getInstance();
        expect(game2).to.equal(gm);
    });
};
ClientControllerTests.prototype.testInitState = function(){
    var gm = this.gameMetier;
    it("Game is not started", function() {
        expect(gm.isStarted()).to.eql(false);
        expect(gm.getNumberOfPlayers()).to.eql(0);
        expect(gm.getScore()).to.eql(0);
    });
};
module.exports = new ClientControllerTests();
var expect = require("expect.js");
var game = require("../client/metier/Game");

function ControllerTests(){
    this.gameController = game;
}
ControllerTests.prototype.testInstance = function(){
    var gm = this.gameController;
    it("Create simple Game instance", function() {
        expect(gm).to.be.an(Object);
    });
    it("Game having properties", function() {
        expect(gm.props).to.be.an(Object);
    });
    it("Game is a singleton", function() {
        var game2 = game.getInstance();
        expect(game2).to.equal(gm);
    });
};
ControllerTests.prototype.testInitState = function(){
    var gm = this.gameController;
    it("Game is not started", function() {
        expect(gm.isStarted()).to.eql(false);
        expect(gm.getNumberOfPlayers()).to.eql(0);
        expect(gm.getScore()).to.eql(0);
    });
};
module.exports = new ControllerTests();
