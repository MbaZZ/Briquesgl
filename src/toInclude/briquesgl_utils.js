/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------
//Class Utils
//------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
LoaderUtils.instance = null;
LoaderUtils.getInstance=function(){
	if(LoaderUtils.instance == null) LoaderUtils.instance=new LoaderUtils();
	return LoaderUtils.instance;
};
function LoaderUtils(){
	//Initialisation des éléments
	this.aFunctionToLoad = [];
	//liste des textures :
	this.nbInitTextures = 0;
	this.nbTexToLoad = 0;
	this.meshs = {};
	this.texturesList = {
		'cube':{
			'droite':'textures/metal.jpg',
			'gauche':'textures/metal.jpg',
			'plafond':'textures/metal.jpg',
			'sol':'textures/metal.jpg'
		},
		'skybox':{
			'xpos':'skyboxMountain/dawnmountain-xpos.png',
			'xneg':'skyboxMountain/dawnmountain-xneg.png',
			'ypos':'skyboxMountain/dawnmountain-ypos.png',
			'yneg':'skyboxMountain/dawnmountain-yneg.png',
			'zpos':'skyboxMountain/dawnmountain-zpos.png',
			'zneg':'skyboxMountain/dawnmountain-zneg.png'
		},
		'briques':{
			'std':'cubeTexture/cube-std.jpg',
			'bricks':'cubeTexture/cube-bricks.jpg',
			'bonusBall':'cubeTexture/cube-bonusBall.jpg',
			'tnt':'cubeTexture/cube-tnt.jpg',
			'grille':'cubeTexture/cube-grille.jpg'
		}
	};
	this.textures = {};	
	this.loadBox = new LoadingBox();
	var loThis = this;
	this.callBack=function(){
		loThis.nbInitTextures++;
		if(loThis.nbInitTextures==loThis.nbTexToLoad){
			loThis.nbInitTextures = 0;
			loThis.nbTexToLoad = 0;
			for(var i in loThis.aFunctionToLoad) loThis.aFunctionToLoad[i]();
			loThis.aFunctionToLoad=[];
			loThis.loadBox.hide();
		}
	};
}
LoaderUtils.prototype.initMesh=function(params){
	this.nbTexToLoad++;
	var loThis = this;
	var loader = new THREE.JSONLoader();
	loader.load( Utils.getModel3DUrl(params.src), function( geometry, materials) {
//		var material = new THREE.MeshBasicMaterial({ wireframe: true } );
		var material = new THREE.MeshFaceMaterial(materials);
//		material.wireframe = true;
		//model3D.mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
		var mesh = new THREE.Mesh( geometry, material );
		loThis.meshs[params.nom] = mesh;
		loThis.callBack();
	} );
};
LoaderUtils.prototype.getMesh=function(psNom){
	if(this.meshs[psNom]==undefined) console.log('Erreur le mesh '+psNom+' n\'a pas été initialisé');
	return this.meshs[psNom];
};
LoaderUtils.prototype.getTexture=function(psCategorie, psElem){//skybox.xpos
	if(this.textures[psCategorie]==undefined) this.textures[psCategorie] = {};
	if(this.textures[psCategorie][psElem]==undefined){
		console.log('Chargement en cours ...');
		this.nbTexToLoad++;
		this.loadBox.show('Chargement des textures..');
		this.loadBox.setTextInfo('Merci de bien vouloir patienter quelques instants..');
		this.textures[psCategorie][psElem] = THREE.ImageUtils.loadTexture(Utils.getAbsUrl('files/img/'+this.texturesList[psCategorie][psElem]), undefined, this.callBack);
	}
	return this.textures[psCategorie][psElem];
};
LoaderUtils.prototype.addFunctionAfterLoad=function(pFunction){
	if(this.nbInitTextures==this.nbTexToLoad){
		pFunction();
	}else
		this.aFunctionToLoad[this.aFunctionToLoad.length] = pFunction;
};
function Parametres(){}
Parametres.list = {};
Parametres.initialize=function(psParamId, psParamVal, psDefValue){
	psParamVal=psParamVal==null || psParamVal==undefined?psDefValue:psParamVal;
	Parametres.list[psParamId] = psParamVal;
};
Parametres.get=function(psParamId){	
	return Parametres.list[psParamId];
};
Parametres.set=function(psParamId, psParamVal){
	var r = new RequestControl(); 
	r.setParams('briquesgl/setParam');
	r.addData(psParamId, psParamVal);
	r.send();
	Parametres.list[psParamId] = psParamVal;
};
//////////////////////////////////// Chronometre /////////////////////
/** Nouvelle version
 * freq : frequence d'indentation du plus petit élément ex 1000 pour seconde
 */
function Chronometre(){
	this.compteur=0;
	this.freq=1000;
	var loThis=this;
	this.pfDisp = null;
	this.indent = function(li){
		loThis.compteur++;
		if(loThis.pfDisp!=null)loThis.pfDisp(loThis.format());
	};
}
Chronometre.prototype.start=function(){
	this.timer=setInterval(this.indent, this.freq);
	this.pfDisp(this.format());
};
Chronometre.prototype.stop=function(){
	clearInterval(this.timer);
};
Chronometre.prototype.reset=function(){
	this.compteur = 0;
};
Chronometre.prototype.format=function(){
	var min = (this.compteur/60);    
	return this.sur2digit(min/60)+":" + this.sur2digit(min%60) + ":" + this.sur2digit(this.compteur%60);
};
Chronometre.prototype.getCompteurEnSeconde=function(){
	return this.compteur;
};
Chronometre.prototype.sur2digit=function(li){
	li=parseInt(li);
	return li<10?'0'+li:li;
};
Chronometre.prototype.setDispFct=function(pfDisp){
	this.pfDisp=pfDisp;
};

/** Ancienne version
 * prof : nombre de unité affichées
 * freq : frequence d'indentation du plus petit élément
 */
//function Chronometre(prof, freq){
//	this.compteurs=[];
//	for(var i=0;i<prof;i++){
//		this.compteurs[i] = 0;
//	}
//	
//	this.timer;
//	this.prof=prof;
//	this.freq=freq;
//	var loThis=this;
//	this.indent = function(li){
//		if(li==undefined)li=0;
//		if(loThis.compteurs[li] == 59 && li < prof-1){
//			loThis.compteurs[li] = 0;
//			loThis.indent(li+1);
//		}
//		else loThis.compteurs[li]++;
//	};
//}
//Chronometre.prototype.start=function(){
//	this.timer=setInterval(this.indent, this.freq);
//};
//Chronometre.prototype.stop=function(){
//	clearInterval(this.timer);
//};
//Chronometre.prototype.reset=function(){
//	for(var i=0;i<this.prof;i++){
//		this.compteurs[i] = 0;
//	}
//};
//Chronometre.prototype.format=function(){
//	lsres='';
//	for(var i=0;i<this.prof;i++){
//		lsres = this.sur2digit(this.compteurs[i]) +  ':' + lsres;
//	}
//	return lsres.substr(0, lsres.length-1);
//};
//Chronometre.prototype.getMinutes=function(){
//	if(this.freq == 1000){
//		return this.compteurs[1];
//	}
//};
//Chronometre.prototype.getSeconds=function(){
//	if(this.freq == 1000){
//		return this.compteurs[1];
//	}
//};

////////////////////////////////////RandomName /////////////////////
Utils.randomPrenoms=['Marcel','Luc', 'René', 'Philippe', 'Pascal', 'laBazz', 'RequinRose', 'ThierryLeRapace', 'LéonLeNettoyeur', 'Mickey Ball', 'Eric', 'Paf', 'Pif', 'Hercule',
                     'Jean', 'Claude', 'BigJas', 'Igor', 'Paul', 'MoudDuGenou', 'Pic', 'Pitch', 'Bouboule', 'Angel', 'BriqueBroker', 'Sonic', 'Gollum', 'Bilbon', 'Bilbo'];
Utils.getRandomPrenom=function(){
	var i = parseInt(Math.random()*10)%Utils.randomPrenoms.length;
	var name=Utils.randomPrenoms[i];
	if(name=='')return Utils.getRandomPrenom();
	Utils.randomPrenoms[i] = '';
	return name;
};

///////////////////// Gestion score (metier) /////////////////////////
function GestionScore(){
    this.scoreAvantBonus=0;
    this.score=0;
    this.psLevel='';
    this.tempsMis=0;
    this.bonus = 0;
    this.tempsMoyen=0;
}    
GestionScore.prototype.initScore=function(psLevel, piScore, piTempsMis){
    this.score=piScore;
    this.scoreAvantBonus=piScore;
    this.psLevel=psLevel;
    this.tempsMis=piTempsMis;
    this.calculTempsMoyenLevel();
    this.calculBonus();
    this.calculScore();
}
GestionScore.prototype.calculTempsMoyenLevel=function(){
    var psLevel = this.psLevel;
    //TODO AVG TOP10 level;
    this.tempsMoyen=600;        
};
GestionScore.prototype.calculBonus=function(){
    this.bonus = this.tempsMoyen - this.tempsMis;
    if(this.bonus<0)this.bonus=0;        
};
GestionScore.prototype.calculScore=function(){
    this.score = Math.round(this.scoreAvantBonus + this.bonus);
};
//////////////////////// Affichage /////////////////////////
function displayTemps(piSeconde){
    var min = (piSeconde/60);    
    return get2digits(min/60)+":" + get2digits(min%60) + ":" + get2digits(piSeconde%60);
}
function displayScoreetBonus(bdistElm, scoreHtml, score, tempsMis, bonus){
    
    var scoreDisplay=parseInt(score);        
    if(bonus != 0){
        var bonusSize=(1000/bonus)%2+2; 
        bdistElm.innerHTML = "Bonus supplementaire : +" + parseInt(bonus);
    }else{
        bdistElm.innerHTML = "";
        var bonusSize=2;            
    }
    scoreDisplay='<span style="font-size:'+ bonusSize*100 +'%;">'+scoreDisplay+' pts</span>';
    scoreHtml.innerHTML = "Score total : " + scoreDisplay ;
}
function displayTemps(piSeconde){
    var min = (piSeconde/60);    
    return get2digits(min/60)+":" + get2digits(min%60) + ":" + get2digits(piSeconde%60);
}
function get2digits(piNumber){
    piNumber = parseInt(piNumber);
    if(piNumber<10)piNumber='0'+piNumber;
    return piNumber;
}