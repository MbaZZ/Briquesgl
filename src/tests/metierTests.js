var expect = require("expect.js");
var Game = require("../client/metier/Game.js6");

function ModelTests(){
    this.gameController = new Game.default();
}
ModelTests.prototype.testInstance = function(){
    var gm = this.gameController;
    it("Create simple Game instance", function() {
        expect(gm).to.be.an(Object);
    });
    it("Game having properties", function() {
        expect(gm.props).to.be.an(Object);
    });
};
ModelTests.prototype.testInitState = function(){
    var gm = this.gameController;
    it("Game is not started", function() {
        expect(gm.isStarted()).to.eql(false);
        expect(gm.getNumberOfPlayer()).to.eql(0);
        expect(gm.getScore()).to.eql(0);
    });
};
module.exports = new ModelTests();
