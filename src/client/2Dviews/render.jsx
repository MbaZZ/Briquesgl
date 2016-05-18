var Home = require('./reactElem/Home.jsx');

var ReactDOM = require('react-dom');
var React = require('react');
var data = {
    menu : {
        title:"Paramètre de la partie",
        listElems:[
            {id:"pseudo", libel:"Nom", type:"text", controller:"GameConfig.changeName"},
            {id:"preferences", libel:"Préférences", type:"button", view:"GameMenu.preferences"},
            {id:"difficulty", libel:"Difficulté", type:"option", options:["Normal", "Dure", "Hardcore"], controller:"GameConfig.changeDifficulte"},
            {id:"stage", libel:"Choix du parcours", type:"option", options:["Level1", "Level2", "Level3"], controller:"GameConfig.chanteParcours"},
            {id:"level", libel:"Choix du niveau", controller:"GameConfig.changeLevel"}
        ]
    }

};
ReactDOM.render(
  <div>
  <Home data={data}/>
  </div>,  document.getElementById('content')
);
