/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------
//Accès aux éléments de la vue
//------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function briquesglView(){	
	this.chatBox = new MessageBox();
	this.messageBox = new MessageBox();
	this.scoreBox = new MessageBox();
	this.finDePartieBox = new QuestionBox();
	this.finDePartieBox.setTitle('Casse briques 3D : Fin de partie');
	this.chatBox.setContent('', 'Chat');
	this.scoresElemHtml = $('<div>',{});
	this.scoreBox.setContent(this.scoresElemHtml, 'Meilleurs scores');	
	
	this.scoreDisplayer=document.getElementById('webglScore');	
}
briquesglView.prototype.initLevel=function(poBriqueScene){
	this.scene = poBriqueScene;
//	this.activerSon = Parametres.get('activerZik');
	this.libelsDifficulte = ['facile', 'normal', 'dure', 'hardcore'];
	this.modeLink = null;
	this.soundLink = null;	
	this.renderWidth=0;
	this.renderHeight=0;
	$('a.infoBulle').mouseover(function(){
		$(this).tooltip('show');
	});	
	
	model3D.initializeScene();
	this.currentPlayer=new Player(this.scene, document.getElementById('container'));
	model3D.setStatElem(document.getElementById('container'));
	
	//Gestion des information de partie
	this.infoPartie = $('#' + Utils.getZoneIdbyId('infoPartie'));
	this.setInfoPartieMessage('init');
		
	this.nbBallesZone=$('#' + Utils.getZoneIdbyId('nbBalles'));	
};
briquesglView.prototype.setInfoPartieMessage=function(lsStep){
	var lsMessage='';
	switch(lsStep){
	case 'finDePartie' : lsMessage='Partie terminée, appuyez sur <b><I>F2</I></b> pour rejouer';break;
	
	
	case 'init':
	default:lsMessage='<b><i>Click</i></b> ou <b><i>F2</i></b> pour lancer la partie';
	}
	this.infoPartie.html(lsMessage);
};

briquesglView.prototype.creerElementSon=function(psSrc, isActive){
	var songElem = document.createElement("audio");
	var source1 = document.createElement("source");
	source1.src = Utils.getAbsUrl("files/son/"+psSrc);
	songElem.appendChild(source1);
	songElem.loop = false;
	$('.gameGlobal').append(songElem);	
	songElem.muted = !isActive;
	return songElem;
};
briquesglView.prototype.updateSoundIcon=function(poSoundLink, isEnable){
	if(!isEnable){
		poSoundLink.attr('src', Utils.getAbsUrl('files/img/iconNoSon.png'));
	} else{
		poSoundLink.attr('src', Utils.getAbsUrl('files/img/iconSon.png'));
	}	
};
briquesglView.prototype.updatezikTitle=function(psTitle){
	if(psTitle)	$('#zikTitle').html(psTitle.substr(0, psTitle.length-3).replace('_', ' '));
};


briquesglView.prototype.updateMusiqueIcon=function(poSoundLink, isEnable){
	if(!isEnable){
		poSoundLink.attr('src', Utils.getAbsUrl('files/img/logoNoMusique.png'));
	} else{
		poSoundLink.attr('src', Utils.getAbsUrl('files/img/logoMusique.png'));
	}	
};
briquesglView.prototype.showNbBallesRestantes=function(nbBalles){
	if(nbBalles<0)nbBalles=0;
	this.nbBallesZone.html(nbBalles);
};
briquesglView.prototype.gagner=function(lsLevel, liNbBalles, lsNextLevel, loScoreMgr){
	var links = lsNextLevel!=undefined?{'nivSuivant':'Niveau suivant', 'rejouer':'Rejouer (F2)', 'retourAccueil':'Retour à l\'accueil'}:{'rejouer':'Rejouer (F2)', 'retourAccueil':'Retour à l\'accueil'};	
	var lsRab=liNbBalles>0?'Avec en bonus '+liNbBalles+' balle(s) inutilisée(s) !':'Aucun bonus..';	
	this.finDePartieBox.addQuestion( "Félicitation ! Vous avez gagné  :) en  <b>"+ldTempsMis.format()+'</b><br />'+lsRab+" <br /> <b>Soit un total de "+nbPoints+" points !!</b><h2>Meilleurs scores ("+this.libelsDifficulte[Parametres.get('partieEnCours').difficulte]+") :</h2>", links, 'actionFinDePartie', 'briquesgl');
	this.finDePartieBox.addContent(this.scoresElemHtml);
	this.finDePartieBox.show();
	this.setInfoPartieMessage('finDePartie');
};
briquesglView.prototype.perdu=function(lsLevel,lsNextLevel, loScoreMgr){
//	var links = lsNextLevel!=undefined?{'rejouer':'Rejouer (F2)', 'nivSuivant':'Niveau suivant', 'retourAccueil':'Retour à l\'accueil'}:{'rejouer':'Rejouer (F2)', 'retourAccueil':'Retour à l\'accueil'};
//	this.finDePartieBox.addQuestion("A quel domage ! T'a <b>perdu</b> en "+ldTempsMis.format()+" :'(<h2>Meilleurs scores ("+this.libelsDifficulte[Parametres.get('partieEnCours').difficulte]+") :</h2>", links, 'actionFinDePartie', 'briquesgl');
//	this.finDePartieBox.addContent(this.scoresElemHtml);
//	this.finDePartieBox.show();
//	this.setInfoPartieMessage('finDePartie');
	
	var test = new MessageBox();
	test.setContent(this.scoresElemHtml, 'Gros con ! ');
	test.show();
};	
briquesglView.prototype.displayScore=function(lsScore){
	this.scoreDisplayer.innerHTML=lsScore;
};
briquesglView.prototype.updateBouleSelected=function(loBouleSelected){
	if(loBouleSelected.prenom)
		$('#bouleName').html(loBouleSelected.prenom);
	else
		$('#bouleName').html('noName');
};
// Levels 
briquesglView.prototype.showCurScore=function(data){
	 var bdistElm = document.getElementById("bonusDisp"), scoreHtml=document.getElementById("score");
	 var gestscore = new GestionScore();
     gestscore.initScore(data.nom, data.scoreInital, data.tempsMis);
     
     var score = data.scoreInital;
     var bonus = gestscore.bonus;
     var tempsMis = gestscore.tempsMis;
     var scoreFinal = gestscore.score;
     var deltaScore = scoreFinal - score;
     
     var animTime = 2000;
     var refreshTime = animTime/20;
     var nbRefresh = animTime/refreshTime;
     var incrScore = deltaScore/ nbRefresh;         
     var interv;
     interv = setInterval(function(){
         if(nbRefresh > 0){
             score += incrScore;
             bonus -= incrScore;
             displayScoreetBonus(bdistElm, scoreHtml, score, tempsMis, bonus);
             nbRefresh--;
         }else{                
             clearInterval(interv);
         }
     }, refreshTime);    
};
briquesglView.prototype.home=function(data){
	
	$('#glpreview').hide();
	LoaderUtils.getInstance().addFunctionAfterLoad(function(){
		setTimeout( "$('#glpreview').animate({width:'toggle'},500);", 500);
	});
	
	var scene = this.scene;
	scene.initialise(true);
	scene.maxSpeed=50;
	scene.minSpeed=50;
	scene.addBoule(500,null,1000, 50, new THREE.Vector3(0,0,1));
//	scene.addBoule(500,null,800, 50, new THREE.Vector3(0,0,-1));
//	scene.addBoule(200,0,1000, 50, new THREE.Vector3(0,0,1));
	scene.addBoule(200,null,800, 50, new THREE.Vector3(0,0,-1));
//	scene.addBoule(800,null,800, 50, new THREE.Vector3(-1,0,0));
//	scene.addBoule(800,null,1000, 50, new THREE.Vector3(-1,0,0));
//	scene.addBoule(800,null,600, 50, new THREE.Vector3(-1,0,0));
	scene.addBoule(800,null,400, 50, new THREE.Vector3(-1,0,0));
	scene.addBoule(1000,null,800, 50, new THREE.Vector3(1,0,0));
	scene.addBoule(1000,null,1000, 50, new THREE.Vector3(1,0,0));
	scene.addBoule(1000,null,600, 50, new THREE.Vector3(1,0,0));
	scene.addBoule(1000,null,400, 50, new THREE.Vector3(1,0,0));
	var selectedBoule = scene.boules[5];
	scene.startCameraBoullesRender(selectedBoule);
	this.updateBouleSelected(selectedBoule);
	Dispatcher.loadListener('lancerBalle', 'briquesgl_controller');	
};
briquesglView.prototype.level1=function(data){
	var scene = this.scene;
	var infoPartie={
		'raqueteSeulementSurX':true,
		'difficulte':Parametres.get('partieEnCours').difficulte
	};
	
	scene.initialise(infoPartie);
	this.currentPlayer.addBoule();
	scene.placerMurBrique(1200,0,600);
	scene.placerMurBrique(0,0,0);	
	scene.ajouterCaisse(-1500, scene.minY, 0, 'bonusBall');
	scene.placerMurBrique(-1200,0,-600);	
	scene.addPlayerControl(this.currentPlayer);
	scene.startRender();
	
	
	
};
briquesglView.prototype.level2=function(data){
	var scene = this.scene;
	scene.initialise({
		'raqueteSeulementSurX':false,
		'raqueteSizeX':9,
		'raqueteSizeY':3,
		'difficulte':Parametres.get('partieEnCours').difficulte
	});
	scene.addPlayerControl(this.currentPlayer);
	scene.ajouterCaisse(0, 0, 0);
	scene.ajouterCaisse(0, 500, 0);
	this.currentPlayer.addBoule();
	scene.startRender();
};
briquesglView.prototype.level3=function(data){
	var scene = this.scene;
	scene.initialise({
		'raqueteSeulementSurX':true,
		'raqueteSizeX':11,
		'raqueteSizeY':3,
		'difficulte':Parametres.get('partieEnCours').difficulte
	});	
	scene.maxSpeed=150;
	scene.minSpeed=75;
	scene.raqueteSeulementSurX=true;
	scene.addPlayerControl(this.currentPlayer);
	scene.placerMurBrique(-500,0,1400);
	scene.placerMurBrique(+500,0,1000);
	scene.placerMurBrique(1500,0,0);
	scene.placerMurBrique(-2000,0,-200);
	this.currentPlayer.addBoule();
	scene.startRender();
};
briquesglView.prototype.level4=function(data){
	var scene = this.scene;
	scene.sizeY = 2000;
	scene.sizeX = 3000;
	scene.initialise({
		'raqueteSeulementSurX':false,
		'raqueteSizeX':7,
		'raqueteSizeY':3,
		'difficulte':Parametres.get('partieEnCours').difficulte
	});
	
	scene.maxSpeed=100;
	scene.minSpeed=80;

	for(var i = 1; i < scene.maxX/300; i++){
		scene.ajouterCaisse(scene.minX + i*600, scene.minY, 0);
		scene.ajouterCaisse(scene.minX + i*600 - 300, scene.minY+300, 0);
		scene.ajouterCaisse(scene.minX + i*600 , scene.minY + 600, 0);
		scene.ajouterCaisse(scene.minX + i*600 - 300, scene.minY+900, 0);
		scene.ajouterCaisse(scene.minX + i*600, scene.minY+1200, 0);
		scene.ajouterCaisse(scene.minX + i*600 - 300, scene.minY+1500, 0);
	}	
	this.currentPlayer.addBoule();this.currentPlayer.addBoule();this.currentPlayer.addBoule();
	scene.addPlayerControl(this.currentPlayer);
	scene.startRender();
};
briquesglView.prototype.level5=function(data){
	var scene = this.scene;
	scene.initialise({
		'raqueteSeulementSurX':true,
		'raqueteSizeX':11,
		'raqueteSizeY':3,
		'difficulte':Parametres.get('partieEnCours').difficulte
	});

	scene.addPlayerControl(this.currentPlayer);
	scene.maxSpeed=120;
	scene.minSpeed=90;
	scene.placerMurBrique(1500,0,2000);
	scene.placerMurBrique(-1000,0,1000);
	scene.placerMurBrique(1500,0,-400);
	scene.placerMurBrique(-2000,0,-600);
	scene.placerMurBrique(-500,0,-2000);
	scene.ajouterCaisse(0, scene.minY, -2000, 'bonusBall');
	scene.ajouterCaisse(-2000, scene.minY, -2000, 'bonusBall');
	scene.ajouterCaisse(2000, scene.minY, -2000, 'bonusBall');
	this.currentPlayer.addBoule();
	scene.startRender();
};
briquesglView.prototype.level6=function(data){
	var scene = this.scene;
	scene.initialise({
		'raqueteSeulementSurX':false,
		'raqueteSizeX':7,
		'raqueteSizeY':3,
		'difficulte':Parametres.get('partieEnCours').difficulte
	});
	scene.maxSpeed=110;
	scene.minSpeed=75;
	scene.ajouterCaisse(0, scene.minY, -2200, 'bonusBall');
	scene.ajouterCaisse(-1000, scene.minY, -2200, 'bonusBall');
	scene.ajouterCaisse(-2000, scene.minY, -2200, 'bonusBall');
	scene.placerMurBrique(1500,0,-400);
	scene.placerMurBrique(1500,200,-400);
	scene.placerMurBrique(+500,0,-1500);	
	scene.placerMurBrique(500,200,-1500);	
	scene.ajouterCaisse(1200,scene.minY,-600, 'tnt');
	scene.placerMurBrique(+500,0,2000);
	this.currentPlayer.addBoule();
	this.currentPlayer.addBoule();
	this.currentPlayer.addBoule();
	scene.addPlayerControl(this.currentPlayer);	
	scene.startRender();
};
briquesglView.prototype.level7=function(data){
	var scene = this.scene;
	scene.sizeY = 2000;
	scene.sizeX = 3000;
	scene.initialise({
		'raqueteSeulementSurX':false,
		'raqueteSizeX':7,
		'raqueteSizeY':3,
		'difficulte':Parametres.get('partieEnCours').difficulte
	});
	scene.maxSpeed=110;
	scene.minSpeed=80;
	var p = [-1000, 1000, 2000];
	for(var i = 1; i < scene.maxX/300; i++){
		for(var iz in p){
			var z=p[iz];
			var dx=iz%2==0?-300:+300;
			scene.ajouterCaisse(scene.minX + i*600, scene.minY, z);
			scene.ajouterCaisse(scene.minX + i*600 + dx, scene.minY+300, z);
			scene.ajouterCaisse(scene.minX + i*600 , scene.minY + 600, z);
			scene.ajouterCaisse(scene.minX + i*600 + dx, scene.minY+900, z);
			scene.ajouterCaisse(scene.minX + i*600, scene.minY+1200, z);
			scene.ajouterCaisse(scene.minX + i*600 + dx, scene.minY+1500, z);
			this.currentPlayer.addBoule();
		}	
	}	
	scene.addPlayerControl(this.currentPlayer);	
	scene.startRender();
};