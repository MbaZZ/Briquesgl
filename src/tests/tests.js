var expect = require("expect.js");
var game = require("../client/metier/Game");

describe("Metier.Game tests", function() {
    describe("create a new game", function() {
        var game1 = game.getInstance();
    it("Create simple Game instance", function() {
        expect(game1).to.be.an(Object);
    });
    it("Game having properties", function() {
        expect(game1.props).to.be.an(Object);
    });
    it("Game is not started", function() {
        expect(game1.isStarted()).to.eql(false);
        expect(game1.getNumberOfPlayers()).to.eql(0);
        expect(game1.getScore()).to.eql(0);
    });
    it("Game is a singleton", function() {
        var game2 = game.getInstance();
        expect(game2).to.equal(game1);
    });
});
    
    describe("Hex to RGB conversion", function() {
        it("converts the basic colors", function() {
        });
    });
});
