var paramTest = require("./persistTests.js");
describe("Persistance des données", function() {
    paramTest.simpleTest();
});

var modelTest = require("./appModelTests.js");
    describe("Class metier", function() {
    modelTest.testInstance();
    modelTest.testAddPlayer();
    modelTest.testPlayer("Raoul");
    modelTest.testPlayer("Jean");
});

var modelClientTests = require("./modelClientTests.js");
describe("Models client", function() {
   modelClientTests.testInstance();
   modelClientTests.testInitState();
});
