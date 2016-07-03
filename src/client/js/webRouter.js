var $ = require('jquery');
var httpC = require('./controller/HttpController.js');
$( document ).ready(function() {
    var url = 'config';
    var retModelAndView = {}; 
    switch(url){
        case 'config' : 
           retModelAndView = httpC.config();
        break;
        case 'inGame' :
           retModelAndView = httpC.inGame();
        break;
        default:
            console.log('erreur, url non gérée : '+url);break;
    }
});
