var expect = require("expect.js");
var Param = require('../model/SettingModel.js6').default;
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
    it("Initialize no default value", function() {
        Param.initialize("toto","ya", "toto");
        expect(Param.get("toto")).to.eql("ya");
    });
    it("SetParam after initialize", function() {
        Param.set("toto","tutu");
        expect(Param.get("toto")).to.eql("tutu");
    });
};
module.exports=new ParamTest();
