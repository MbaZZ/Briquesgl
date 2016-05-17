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
    it("GameController have Game instance", function() {
        expect(gm.gameModel).to.be.an(Object);
    });
    it("PlayerController have Player instance", function() {
        expect(player.playerModel).to.be.an(Object);
    });
    httpc.config();
};
ControllerTests.prototype.testInitState = function(){
    var loThis = this;
    it("Game is not started", function() {
        expect(loThis.gameController.gameModel.isStarted()).to.eql(false);
        expect(loThis.gameController.gameModel.getNumberOfPlayers()).to.eql(0);
        expect(loThis.gameController.gameModel.getScore()).to.eql(0);
    });
};
module.exports = new ControllerTests();
