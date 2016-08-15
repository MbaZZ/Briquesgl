var layout = require('../views/2d/LayoutManager.jsx'); 

var objet3D = {
    Scene : require('../views/3d/objects/BriqueScene.js6').default,
    Ball : require('../views/3d/objects/BriqueBall.js6').default,
    Camera : require('../views/3d/objects/BriqueCamera.js6').default,
    Renderer : require('../views/3d/objects/BriqueRenderer.js6').default
};
var Game = require('../model/Game.js6').default;
var Persist = require('../model/Persist.js6').default;
var dataView  = require('../params/viewData.fr.json');
function GameConfigController(){
    this.gameModel = new Game();
    this.levelCourrant = 'home';

    //Persist par defaut
    var lsZikName='MbZ_session1.mp3';
    switch(this.levelCourrant){
    	case 'home':lsZikName='Finn_The_Giant_Meets_Sandmonk__New_Dub_Order_64kb.mp3';break;
    	case 'level2':lsZikName='testmbazz.mp3';break;
    	case 'level4':case 'level7': lsZikName = 'Mike_Errecart.-.Monkey-bubble.mp3';break;
    	default:lsZikName='MbZ_session1.mp3';
    }
    Persist.initialize('activerZik', true);
    Persist.initialize('activerEffetSon', true);
    Persist.initialize('zik', lsZikName);
    //unused for the moment : Persist.sync();

    //Persist.initialize('game.player.current.pseudo', 'Jean much much');
    Persist.set('game.player.current.pseudo', 'Jean much much');
    Persist.set('game.settings.difficulty', 4);
    Persist.set('game.stage', 'Stage 1 : Aie');
    Persist.set('game.currentLevel', 'Level 1 : Ca va piquer !');

}
GameConfigController.prototype.renderPreview=function(){
    layout.render('Home', dataView);
    this.scene = new objet3D.Scene(); 
    this.renderer = new objet3D.Renderer();
    this.ball = new objet3D.Ball();
    this.camera = new objet3D.Camera();
    this.scene.add(this.ball);
    this.renderer.render(this.scene, this.camera);
    document.getElementById('renderPreview3D').appendChild(this.renderer.domElement); 
    return {view:'Home', data:dataView};
};
GameConfigController.prototype.renderTest1=function(){
    layout.render('Home', dataView);
    this.scene = new objet3D.Scene(); 
    this.renderer = new objet3D.Renderer();
    this.ball = new objet3D.Ball();
    this.camera = new objet3D.Camera();
    this.scene.add(this.ball);
    this.renderer.render(this.scene, this.camera);
    document.getElementById('renderPreview3D').appendChild(this.renderer.domElement); 
    return {view:'Home', data:dataView};
};
module.exports=new GameConfigController(); 
