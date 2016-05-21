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
    Setting.sync();
}
GameConfigController.prototype.home=function(){
    return {view:'Home', data:dataView};
};
module.exports=new GameConfigController(); 
