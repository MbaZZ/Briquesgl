//var expect = require("expect.js");
 //var metierTest = require("./metierTests.js");

describe("Tests metier", function() {
   // metierTest.testInstance();
    //metierTest.testInitState();
});


var controllerTest = require("./controllerTests.js");

describe("Tests controllers", function() {
   controllerTest.testInstance();
   controllerTest.testInitState();
});
