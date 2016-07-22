var expect = require("expect.js");
var PersistModel = require('../client/js/model/Persist.js6').default;
function PersistModelTest(){
}
PersistModelTest.prototype.simpleTest=function(){
    it("SetPersistModel", function() {
        PersistModel.set("toto","tutu");
        expect(PersistModel.get("toto")).to.eql("tutu");
    });
    it("Initialize default value", function() {
        PersistModel.initialize("toto",null, "toto");
        expect(PersistModel.get("toto")).to.eql("toto");
    });
    it("addCallBack", function() {
	var compteurCallBack = 0;
	PersistModel.addListener('toto.tutu.haha', function(){
	    compteurCallBack ++;
	});
        expect(compteurCallBack).to.eql(0);
        PersistModel.set("toto.tutu.haha","Hello !");
        expect(compteurCallBack).to.eql(1);
        PersistModel.set("toto.tutu.haha","OOO");
        expect(compteurCallBack).to.eql(2);
        PersistModel.set("toto.tutus.haha","Hello !");
        expect(compteurCallBack).to.eql(2);
    });
    it("Initialize no default value", function() {
        PersistModel.initialize("toto","ya", "toto");
        expect(PersistModel.get("toto")).to.eql("ya");
    });
    it("SetPersistModel after initialize", function() {
        PersistModel.set("toto","tutu");
        expect(PersistModel.get("toto")).to.eql("tutu");
    });
    it("SetPersistModel Object", function() {
        PersistModel.setObject("game",{
	"players" : {
		 "player1" : "toto",
		 "player2" : "toto2",
		 "player3" : "toto3",
		 "player4" : "toto4",
		 "player5" : "toto5"
		},
	"tableau" : ["hello", "holla", "hoho", "hihi"]
	});
        expect(PersistModel.get("game.players.player1")).to.eql("toto");
        expect(PersistModel.get("game.players.player3")).to.eql("toto3");
        expect(PersistModel.get("game.players.player4")).to.eql("toto4");
        expect(PersistModel.get("game.tableau.0")).to.eql("hello");
        expect(PersistModel.get("game.tableau.2")).to.eql("hoho");
        expect(PersistModel.get("game.tableau.length")).to.eql(4);
    });
};
module.exports=new PersistModelTest();
