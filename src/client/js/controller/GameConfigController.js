var layout = require('../2Dviews/LayoutManager.jsx'); 

var objet3D = {
    Scene : require('../3Dviews/BriqueScene.js6').default,
    Ball : require('../3Dviews/BriqueBall.js6').default,
    Camera : require('../3Dviews/BriqueCamera.js6').default,
    Renderer : require('../3Dviews/BriqueRenderer.js6').default
};
var Game = require('../metier/Game.js6').default;
var Setting = require('../metier/Setting.js6').default;
var dataView  = require('../params/viewData.fr.json');
function GameConfigController(){
    this.gameModel = new Game();
    this.levelCourrant = 'home';

    //Setting par defaut
    var lsZikName='MbZ_session1.mp3';
    switch(this.levelCourrant){
    	case 'home':lsZikName='Finn_The_Giant_Meets_Sandmonk__New_Dub_Order_64kb.mp3';break;
    	case 'level2':lsZikName='testmbazz.mp3';break;
    	case 'level4':case 'level7': lsZikName = 'Mike_Errecart.-.Monkey-bubble.mp3';break;
    	default:lsZikName='MbZ_session1.mp3';
    }
    Setting.initialize('activerZik', true);
    Setting.initialize('activerEffetSon', true);
    Setting.initialize('zik', lsZikName);
    //unused for the moment : Setting.sync();

    //Setting.initialize('game.player.current.pseudo', 'Jean much much');
    Setting.set('game.player.current.pseudo', 'Jean much much');
    Setting.set('game.settings.difficulty', 4);
    Setting.set('game.stage', 'Stage 1 : Aie');
    Setting.set('game.currentLevel', 'Level 1 : Ca va piquer !');

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
