var expect = require("expect.js");
var http = require("../client/controller/HttpController.js");
var game = http.gameConfControl;
var player = http.playerControl;
function ControllerTests(){
    this.gameController = game;
    this.httpController = http;
    this.playerController = player;
}
ControllerTests.prototype.testInstance = function(){
    var gm = this.gameController;
    it("Create simple GameController instance", function() {
        expect(gm).to.be.an(Object);
    });
    var httpc = this.httpController;
    it("Create simple HttpController instance", function() {
        expect(httpc).to.be.an(Object);
    });
    var player = this.playerController;
    it("Create simple PlayerController instance", function() {
        expect(player).to.be.an(Object);
    });

    httpc.config();
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
