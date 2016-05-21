var $ = require('jquery');
var layout = require('../2Dviews/render.jsx'); 
var httpC = require('./HttpController.js');
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
    layout.render(retModelAndView.view, retModelAndView.data);
});
