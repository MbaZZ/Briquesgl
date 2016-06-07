var expect = require("expect.js");
var Param = require('../client/metier/Setting.js6').default;
function ParamTest(){
}
ParamTest.prototype.simpleTest=function(){
    it("SetParam", function() {
        Param.set("toto","tutu");
        expect(Param.get("toto")).to.eql("tutu");
    });
    it("Initialize default value", function() {
        Param.initialize("toto",null, "toto");
        expect(Param.get("toto")).to.eql("toto");
    });
    it("addCallBack", function() {
	var compteurCallBack = 0;
	Param.addListener('toto.tutu.haha', function(){
	    compteurCallBack ++;
	});
        expect(compteurCallBack).to.eql(0);
        Param.set("toto.tutu.haha","Hello !");
        expect(compteurCallBack).to.eql(1);
        Param.set("toto.tutu.haha","OOO");
        expect(compteurCallBack).to.eql(2);
        Param.set("toto.tutus.haha","Hello !");
        expect(compteurCallBack).to.eql(2);
    });
    it("Initialize no default value", function() {
        Param.initialize("toto","ya", "toto");
        expect(Param.get("toto")).to.eql("ya");
    });
    it("SetParam after initialize", function() {
        Param.set("toto","tutu");
        expect(Param.get("toto")).to.eql("tutu");
    });
    it("SetParam Object", function() {
        Param.setObject("game",{
	"players" : {
		 "player1" : "toto",
		 "player2" : "toto2",
		 "player3" : "toto3",
		 "player4" : "toto4",
		 "player5" : "toto5"
		},
	"tableau" : ["hello", "holla", "hoho", "hihi"]
	});
        expect(Param.get("game.players.player1")).to.eql("toto");
        expect(Param.get("game.players.player3")).to.eql("toto3");
        expect(Param.get("game.players.player4")).to.eql("toto4");
        expect(Param.get("game.tableau.0")).to.eql("hello");
        expect(Param.get("game.tableau.2")).to.eql("hoho");
        expect(Param.get("game.tableau.length")).to.eql(4);
    });
};
module.exports=new ParamTest();
