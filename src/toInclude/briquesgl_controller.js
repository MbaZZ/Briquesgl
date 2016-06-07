//------------------------------------
// Controleur javascript
//------------------------------------
function briquesgl_controller(request, response){
    this.request = request;
    this.response = response;   
    this.view = new briquesglView();
    
    this.levelCourrant = this.request.getAction();
    var lalevels = this.response.getData('levelOrder');
    this.nextLevel = lalevels[lalevels.indexOf(this.levelCourrant)+1];
    
    var lsZikName='MbZ_session1.mp3';
    switch(this.levelCourrant){
    	case 'home':lsZikName='Finn_The_Giant_Meets_Sandmonk__New_Dub_Order_64kb.mp3';break;
    	case 'level2':lsZikName='testmbazz.mp3';break;
    	case 'level4':case 'level7': lsZikName = 'Mike_Errecart.-.Monkey-bubble.mp3';break;
    	default:lsZikName='MbZ_session1.mp3';
    }
    this.view.updatezikTitle(lsZikName);
    
    Parametres.initialize('activerZik', response.getData('activerZik')=='true');
    Parametres.initialize('activerEffetSon', response.getData('activerEffetSon')=='true');
    Parametres.initialize('zik', lsZikName);
    Parametres.initialize('difficulte', response.getData('difficulte'), 0);
    Parametres.initialize('listLevels', this.response.getData('levelOrder'));    
    Parametres.initialize('itemEnPossession', this.response.getData('itemEnPossession'));
    Parametres.initialize('itemDescription', this.response.getData('itemDescription'));
    
    var partieEnCours=eval("(" + this.response.getData('partieEnCours') + ')');
    Parametres.initialize('partieEnCours', partieEnCours);   //TODO, il ne doit en rester qu'un si possible
    this.partieModel = new PartieModel(partieEnCours);
    this.partieModel.sync();
    
    //Mapping ajax url -> element
    Utils.addAjaxRequestToViewObject('chat_controller', 'home', this.view.chatBox.divContent);
    Utils.addAjaxRequestToViewObject('briquesgl_controller', 'getScores', this.view.scoresElemHtml);
    Utils.addAjaxRequestToViewObject('briquesgl_controller', 'addScore', this.view.scoresElemHtml);
    //Utils.addAjaxRequestToViewObject('briquesgl_controller', 'setParam', this.onReceiveParam);
    
    
    
    //Gestion des scores
    this.requestScore = new RequestControl();
    this.requestScore.setParams(undefined, 'briquesgl_controller', 'getScores');      
    this.requestScore.addData('level', this.levelCourrant);
    this.requestScore.addData('difficulte', Parametres.get('partieEnCours').difficulte);
    
    //Chargements des contenus supplémentaires   
//	Dispatcher.jouerActionAjax('chat_controller', 'home',undefined,function(){
//		chatView.addNotificationListener(function(){
//			console.log('tototototototototootttttttttttttttttttttttttttt');
//		});
//		
//	});
}
briquesgl_controller.prototype.setParam=function(){
	this.partieModel.updateData(eval("(" + this.response.getData('partieEnCours') + ')'));
};

briquesgl_controller.prototype.onEvent=function(psEvent){
	if(this.listener){
		if(psEvent==Dispatcher.Events.interruptScript){
			this.listener.fairePause();
		}else if(psEvent==Dispatcher.Events.unInterruptScript){
			this.listener.fairePlay();
		}
	}
};
briquesgl_controller.prototype.initLevel=function(){	
	 //Initialisation des meshs
    LoaderUtils.getInstance().initMesh({
    	'nom':'GameScene',
    	'src':'scene/medieval/gameSceneMedieval.js'
//    	'src':'GameScene.js'
    });
    LoaderUtils.getInstance().initMesh({
    	'nom':'raquette',
    	'src':'raquette.js'
    });
   
    var loBriqueScene = new briqueScene();
    this.view.initLevel(loBriqueScene);
    this.listener = new briquesglListener(this, this.view, loBriqueScene);  
    loBriqueScene.difficulte = Parametres.get('partieEnCours').difficulte;
    loBriqueScene.listner = this.listener;
};

briquesgl_controller.prototype.loadAction=function(lsAction){
    if(lsAction.substr(0,5) == 'level'){
    	var loThis=this;
    	this.initLevel();
    	LoaderUtils.getInstance().addFunctionAfterLoad(function(){    		
    		loThis.view[lsAction](loThis.request.getUrl());
    	});
    }else if(this[lsAction]){
    	return this[lsAction]();
    }
};
briquesgl_controller.prototype.home=function(){
	this.initLevel();
	this.view.home(this.request.getUrl());
//    this.view.home(this.request.getUrl());
};
briquesgl_controller.prototype.showCurScore=function(){
	this.view.showCurScore(this.response.getData('dernierLevelTermine'));
};
briquesgl_controller.prototype.testColision=function(){
	this.initLevel();
    this.view.testColision(this.request.getUrl());
};
briquesgl_controller.prototype.reproBug=function(){
	this.initLevel();
    this.view.reproBug(this.request.getUrl());
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------
//Listeners : Contrôleur des evenements internes
//------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function briquesglListener(controller, view, poBriqueScene){
	this.controller = controller;
	this.isChatLoaded = false;
	this.nbBalles = 0;
	this.nbBallesEnParties = 0;
	this.nbCaisse = 0;
	this.startTime = null;
	this.score = 0;
	this.partieEnCours = false;
	this.listenerClick = false;
	this.view = view;
	this.sonElems = {};
	this.musiqueElem;
	this.enPause=false;
	this.pauseTime;
	this.scene = poBriqueScene;
	this.scoreManager=new GestionScore();
	//Initialisation de des listeners clavier
	var loThis = this;
	this.listenerLancerBoule = function(){		
		loThis.lancerBalle();				
	};
	this.chrono = new Chronometre();
	this.chrono.setDispFct(function(psChrono){
		loThis.view.infoPartie.html('Temps écoule : ' + psChrono);
	});
	//Initialisation des elements sonore
	var lbIsActive = Parametres.get('activerEffetSon');
	if(Math.random() < 0.5){
		this.sonElems.victoire = this.view.creerElementSon('buitages/victoire.mp3', lbIsActive);
		this.sonElems.defaite = this.view.creerElementSon('buitages/defaite.mp3', lbIsActive);		
	}else{
		this.sonElems.victoire = this.view.creerElementSon('buitages/victoire2.mp3', lbIsActive);
		this.sonElems.defaite = this.view.creerElementSon('buitages/defaite2.mp3', lbIsActive);
	}
	this.sonElems.victoire.volume=0.2;
	this.sonElems.defaite.volume=0.2;
	this.sonElems.rate = this.view.creerElementSon('buitages/rate.mp3', lbIsActive);
	this.sonElems.rate.volume = 0.2;
	this.sonElems.bruitageCaisse1 = this.view.creerElementSon('buitages/tac1.mp3', lbIsActive);
	this.sonElems.bruitageCaisse2 = this.view.creerElementSon('buitages/tac2.mp3', lbIsActive);	
	this.sonElems.bruitageMur = this.view.creerElementSon('buitages/tac3.mp3', lbIsActive);
	
//	this.sonElems.musique = this.view.creerElementSon(Parametres.get('zik'));
//	this.sonElems.musique.loop = true;
//	this.sonElems.musique.volume = 0.8;
	lbIsActive = Parametres.get('activerZik');
	this.musiqueElem = this.view.creerElementSon(Parametres.get('zik'), lbIsActive);
	this.musiqueElem.loop = true;
	this.musiqueElem.volume = 0.8;
	
	//Init actions de jeux
	this.gameActions = {
			'113':'lancerPartie',
			'37':'raqAGauche',
			'39':'raqADroite',
			'40':'raqEnBas',
			'38':'raqEnHaut'
	};
	this.gameActions['100']=this.gameActions['37'];//4NUM
	this.gameActions['102']=this.gameActions['39'];//6NUM
	this.gameActions['104']=this.gameActions['38'];//8NUM
	this.gameActions['98']=this.gameActions['40'];//2NUM
	this.gameActions['101']=this.gameActions['113'];//5NUM
	
	//Init action sur les items
	this.userActionnableItem = {};
	this.itemEnPossession = Parametres.get('itemEnPossession');
	this.itemDescription = Parametres.get('itemDescription');
	for(var sName in this.itemEnPossession){
		var lsItemId=sName;
		var loItem=this.itemDescription[lsItemId];
		loItem.id=lsItemId;
		this.userActionnableItem[loItem.codeTouche] = loItem;
	}
	
	//Gestion des écoutes clavier	
	var loListener=this;
	this.itempActionneur=document.addEventListener('keyup',function(event){	
		if(loListener.userActionnableItem[event.keyCode]){
			event.preventDefault();
			loListener.actioner(loListener.userActionnableItem[event.keyCode].id);
		}else if(loListener.gameActions[event.keyCode]){
			loListener.actionDePartie(loListener.gameActions[event.keyCode]);				
		}
	},false);
}
briquesglListener.prototype.fairePause=function(){
	this.chrono.stop();
	this.scene.partiEnCours=false;
	this.enPause=true;
	this.pauseTime=new Date();
};
briquesglListener.prototype.fairePlay=function(){
	if(this.enPause){
		this.chrono.start();
		this.scene.partiEnCours=true;
		this.enPause=false;
	}
};
briquesglListener.prototype.actionDePartie=function(lsActionID){
	switch(lsActionID){
	case 'lancerPartie':
		if(!this.partieEnCours) this.listenerLancerBoule();	else window.location.href='';//controle de lancement/reset de partie	
		break;
	case 'raqAGauche':
	case 'raqADroite':
	case 'raqEnBas':
	case 'raqEnHaut':
		default:console.log('actionDePartie inconnue ('+lsActionID+')');
	}
	
};
briquesglListener.prototype.addItem=function(lsItemID){
	var loItem=itemDescription[lsItemID];
	loItem.id=lsItemID;
	this.userActionnableItem[loItem.codeTouche] = loItem;
};
briquesglListener.prototype.actioner=function(lsItemID){
	//Partie commune
	//Verification du credit
	if(this.itemEnPossession[lsItemID]<1) return false;	
	this.itemEnPossession[lsItemID]--;
	
	var loItem=this.itemDescription[lsItemID];
	//verification des preconditions, si non respecté : on ignore l'appui
	if(loItem.precoActivation) for(var i in loItem.precoActivation)	if(loItem.precoActivation[i] != this[i]) return false;
	
	console.log('Activation de ' + lsItemID);
	var currPlayer=this.view.currentPlayer;
	//Partie specialisee
	switch(lsItemID){
	case 'dpc':
		this.scene.lancerBoule(currPlayer.derniereBouleLance.clone(1));
		currPlayer.derniereBouleLance=currPlayer.derniereBouleLance.clone(-1);
		this.scene.lancerBoule(currPlayer.derniereBouleLance);
		this.nbBallesEnParties+=2;
	break;
	case 'fil':	currPlayer.mettreFilet();break;
	case 'trs':	currPlayer.activerTranspersor();break;
	case 'arq': currPlayer.agrandirRaquette();break;
	case 'rbl': currPlayer.ralentirBalle();break;
		default:console.log('Action utilisateur ' + lsItemID);
	}
	
	currPlayer.notifier(loItem.libel);
};
briquesglListener.prototype.declencherBonus=function(psBonusID){
	switch(psBonusID){
		case 'ball' : this.view.currentPlayer.addBoule();break;
		default:break;//Nada bonus
	}	
};
briquesglListener.prototype.bougerRaquette=function(liSens){
	console.log('mouvement raquette');
};

briquesglListener.prototype.startGame=function(){
	window.location.href=Utils.getAbsUrl('briquesgl/'+this.controller.nextLevel);
};
briquesglListener.prototype.afficherChat=function(args){
	this.view.messageBox.hide();
	var loThis = this;
	if(!this.isChatLoaded){//Chargement du chat 1 seul fois lors de la première ouverture
		Dispatcher.jouerActionAjax('chat_controller', 'home', undefined, function(){
			loThis.view.chatBox.show();
		});
		this.isChatLoaded = true;
	}else{
		this.view.chatBox.show();
	}	
	return false;
};
briquesglListener.prototype.afficherScores=function(args){
	var view = this.view;
	Dispatcher.jouerRequestAjax(this.controller.requestScore, function(){
		//Actualisation des scores
		view.messageBox.hide();
		view.chatBox.hide();
		view.scoreBox.show();
		return false;		
	});
	return false;
};
briquesglListener.prototype.afficherAProposDe=function(args){
	this.view.messageBox.setContent('BriqueGL est en cours de developpement, debugg et paufinage sont à l\'ordre du jour. <br /> De nouveaux niveaux sont en cours de création.<br /><br /> N\'hésitez pas à me faire part de toutes vos idées/remarques ! <br /> Le '+Utils.createLink('chat', 'chat/home', 'briquesgl_controller', 'afficherChat')+' est à votre disposition :)', 'A propos de BriqueGL');
	this.view.messageBox.show();
	return false;
};
briquesglListener.prototype.demarerPartie=function(args){
	this.musiqueElem.play();
	this.partieEnCours = true;
	this.startTime=new Date();
	var loThis = this;
	this.chrono.start();
//	this.timeInterval = setInterval(function(){
//		loThis.view.infoPartie.html('Temps écoule : ' + loThis.chrono.format());
//	}, 1000);
};
briquesglListener.prototype.perdreBalle=function(){
	this.score -= 100;this.nbBallesEnParties--;
	this.view.displayScore(this.score+'pts');
	if(this.nbBallesEnParties==0 && this.nbBalles==0)
		this.finDePartie(false);
	else
		this.sonElems.rate.play();
	return true;
};
briquesglListener.prototype.ajouterCaisse=function(){
	this.nbCaisse++;
};
briquesglListener.prototype.taperMur=function(args){
	this.sonElems.bruitageMur.play();
};
briquesglListener.prototype.taperCaisse=function(caisse){
	if(caisse.estDetruite()){
		this.sonElems.bruitageCaisse1.play();
		this.nbCaisse--;this.score+=caisse.specif.points;
		this.view.displayScore(this.score+'pts');
		if(this.nbCaisse < 1) this.finDePartie(true);
	}else{
		this.sonElems.bruitageCaisse2.play();
	}
};
briquesglListener.prototype.lancerBalle=function(){
	if(this.partieEnCours==0)this.demarerPartie();
	if(this.nbBalles<2){ model3D.renderer.domElement.removeEventListener( 'click', this.listenerLancerBoule); this.listenerClick=false;}
	//this.scene.lancerBoule();
	this.view.currentPlayer.lancerBoule();
	this.nbBalles--;this.nbBallesEnParties++;
	this.controller.view.showNbBallesRestantes(this.nbBalles);
};
briquesglListener.prototype.gagnerBalle=function(){
	this.nbBalles++;
	this.controller.view.showNbBallesRestantes(this.nbBalles);
	if(!this.listenerClick){
		model3D.renderer.domElement.addEventListener( 'click', this.listenerLancerBoule ,false);
		this.listenerClick = true;
	}
};
briquesglListener.prototype.finDePartie=function(aGagne){
	this.musiqueElem.pause();	
	this.chrono.stop();
	var loPartieEnCours=Parametres.get('partieEnCours');
	this.scoreManager.initScore(loPartieEnCours.level.enCours, this.score, this.chrono.getCompteurEnSeconde());
	
	this.view.displayScore(this.score+'pts');
	//envoi des scores
	this.requestScore = new RequestControl();
	this.requestScore.setParams('briquesgl/addScore');	
	this.requestScore.addData('difficulte', Parametres.get('partieEnCours').difficulte);
	this.requestScore.addData('level', this.controller.levelCourrant);
	this.requestScore.addData('temps', this.chrono.getCompteurEnSeconde());
	this.requestScore.addData('nbBallesRestantes', this.nbBalles);
	this.requestScore.addData('score', this.score);
	this.requestScore.addData('aGagne', aGagne);
	Dispatcher.jouerRequestAjax(this.requestScore);	
	//appel a la vue pour les messages
	if(aGagne){
		this.sonElems.victoire.play();
		this.controller.view.gagner(this.controller.levelCourrant, this.nbBalles, this.controller.nextLevel, this.scoreManager);
	}else{
		this.controller.view.perdu(this.controller.levelCourrant, this.controller.nextLevel, this.scoreManager);
		this.sonElems.defaite.play();
	}	
	this.scene.stopRender();
};
briquesglListener.prototype.navigationBallePrec=function(){
	var boules = this.scene.boules;
	model3D.boulSelected--;
	if(model3D.boulSelected == boules.length) model3D.boulSelected = 0;	else if(model3D.boulSelected == -1)	model3D.boulSelected = boules.length-1;			
	model3D.cameraBoule = boules[model3D.boulSelected];
	this.view.updateBouleSelected(model3D.cameraBoule);
};
briquesglListener.prototype.navigationBalleSuiv=function(){
	var boules = this.scene.boules;
	model3D.boulSelected++;	
	if(model3D.boulSelected == boules.length) model3D.boulSelected = 0;	else if(model3D.boulSelected == -1)	model3D.boulSelected = boules.length-1;			
	model3D.cameraBoule = boules[model3D.boulSelected];
	this.view.updateBouleSelected(model3D.cameraBoule);
};
briquesglListener.prototype.activerZik=function(link){
	var lbSonAActive = !Parametres.get('activerZik');	
	this.view.updateMusiqueIcon(link.find('img'), lbSonAActive);
	this.musiqueElem.muted = !lbSonAActive;
	Parametres.set('activerZik', lbSonAActive);
	return false;
};
briquesglListener.prototype.activerEffetSon=function(link){
	var lbSonAActive = !Parametres.get('activerEffetSon');	
	this.view.updateSoundIcon(link.find('img'), lbSonAActive);
	for(var s in this.sonElems){
		this.sonElems[s].muted = !lbSonAActive;
	}
	Parametres.set('activerEffetSon', lbSonAActive);
	return false;
};
//briquesglListener.prototype.activerSon=function(link){
//	var lbSonAActive = !Parametres.get('activerZik');	
//	this.view.updateSoundIcon(link.find('img'), lbSonAActive);
//	for(var s in this.sonElems){
//		this.sonElems[s].muted = !lbSonAActive;
//	}
//	Parametres.set('activerZik', lbSonAActive);
//	Parametres.set('activerEffetSon', lbSonAActive);
//	return false;
//};
//briquesglListener.prototype.choixduniveau=function(args){
//	var liLevel = args.idClic;
//	Parametres.set('difficulte', liLevel);
//	console.log('changement du niveau en ' + liLevel);
//	this.scene.paramPartie.difficulte = liLevel;
//};

briquesglListener.prototype.actionFinDePartie=function(args){
	switch(args.idClic){
		case 'rejouer':window.location.href='';break;
		case 'nivSuivant':window.location.href=Utils.getAbsUrl('briquesgl/'+this.controller.nextLevel);break;
		default:window.location.href=Utils.getAbsUrl('');
	}
};