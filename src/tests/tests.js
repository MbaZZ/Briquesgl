//var expect = require("expect.js");
var modelClientTests = require("./modelClientTests.js");
describe("Tests des models client", function() {
   modelClientTests.testInstance();
   modelClientTests.testInitState();
});

/*
var controllerTest = require("./controllerTests.js");
describe("Tests controllers", function() {
   controllerTest.testInstance();
   controllerTest.testInitState();
});
*/
var paramTest = require("./persistTests.js");
describe("Tests SettingsModel", function() {
    paramTest.simpleTest();
});

var modelTest = require("./appModelTests.js");
describe("Tests des models app", function() {
   modelTest.testInstance();
   modelTest.testInitState();
   modelTest.testAddPlayer();
   modelTest.testPlayer();
});
