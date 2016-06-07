/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------
//Class BouleObj
//------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BouleObj(x,y,z, vitesse, direction, color){	
	if(color==undefined)color=webglUtils.getRandomColor();
	this.rayon = 100;//80;
	if(y==null) y=briqueScene.instance.murs['sol'].position.y+this.rayon ;
	
	this.geometry =  new THREE.SphereGeometry( this.rayon, 32, 16 ); // radius, segmentsWidth, segmentsHeight
	this.bouleMeshCamera = new THREE.CubeCamera( 0.1, 5000, 32 );// parameters: near, far, resolution
	// mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
	model3D.scene.add( this.bouleMeshCamera );
	var bouleMeshMaterial = new THREE.MeshBasicMaterial( { envMap: this.bouleMeshCamera.renderTarget, color: color } );
	this.bouleMesh = new THREE.Mesh( this.geometry, bouleMeshMaterial );
	this.bouleMesh.position.set(x, y, z);
	this.bouleMeshCamera.position = this.bouleMesh.position;
	model3D.scene.add(this.bouleMesh);
	this.bouleMesh.BouleObj = this;//Ref
	
	//gestion du miroir static
	this.bouleMesh.visible = false;
	this.bouleMeshCamera.updateCubeMap( model3D.renderer, model3D.scene );
	this.bouleMesh.visible = true;
	//Getion deplacement
	this.vitesse = vitesse;
	this.direction = null;
	this.transperceCaisse = false;
	this.poid = 10;
	this.vecteurGravite = new THREE.Vector3(0,0,0);
	this.prochaineDirection = direction.normalize();//calculer lors de chaque changement de direction
	this.mouvement;//calculer lors de chaque changement de direction
	this.nbAvancementAvantMur = 0;
	this.prochaineBriqueTouchee = null;
	this.prochainJoueurConcerne = null;
	
	//Attributs deco
	this.prenom = Utils.getRandomPrenom();
	
}
BouleObj.prototype.getRaysOrig=function(){
	
	//TODO
	/*
	 * Utilisation d'une boite minMax (box3)
	 * si intersection boite brique/boule (ray.isIntersectionBox (box))
	 * 	si intersection point d'intersection via direction d'intersection vers la boule
	 * 		alors boule touche caisse 
	 */
	
	/**
	 * VAutou15 TODO
	 * Creation de rayon central
	 * 
	 */
	
	
	
	var pos = this.bouleMesh.position;
	return [
	        pos,
	        pos.clone().add(new THREE.Vector3(0,0,0)),
	        pos.clone().add(new THREE.Vector3(-this.rayon,0,0)),
	        pos.clone().add(new THREE.Vector3(0,this.rayon,0)),
	        pos.clone().add(new THREE.Vector3(0,-this.rayon,0)),
	        pos.clone().add(new THREE.Vector3(0,0,-this.rayon)),
	        pos.clone().add(new THREE.Vector3(0,0,this.rayon))
	];
	
//	var ob=this.direction.normalize().multiplyScalar(this.rayon);
	
	//Calcul du changement de repère
//	var AobToX = new THREE.Vector3(1,0,0).angleTo(this.prochaineDirection);
//	var AobToY = new THREE.Vector3(0,1,0).angleTo(this.prochaineDirection);
//	var AobToZ = new THREE.Vector3(0,0,1).angleTo(this.prochaineDirection);
//	var a = new THREE.Euler( AobToX, AobToY, AobToZ, 'ZYX' );
//	var b = new THREE.Euler( -AobToX, -AobToY, -AobToZ, 'XYZ' );
////	debugger
//	return [
////	        pos.clone().add(this.prochaineDirection.clone().multiplyScalar(this.rayon)),
////	        pos.clone().add(new THREE.Vector3(0,this.rayon,0).applyEuler(a)),
////	        pos.clone().add(new THREE.Vector3(0,-this.rayon,0).applyEuler(a))
//	        pos.clone().add(new THREE.Vector3(0,0,-this.rayon).applyEuler(a))
////	        pos.clone().add(new THREE.Vector3(0,0,this.rayon).applyEuler(a))
////	        pos.clone().add(this.prochaineDirection)
//	];
	
	//Calcul du changement de repère
//	var AobToX = - new THREE.Vector3(1,0,0).angleTo(this.prochaineDirection);
//	var AobToY = - new THREE.Vector3(0,1,0).angleTo(this.prochaineDirection);
//	var AobToZ = - new THREE.Vector3(0,0,1).angleTo(this.prochaineDirection);
//	var a = new THREE.Euler( AobToX, AobToY, AobToZ, 'ZYX' );
////	debugger
//	return [
//	        pos.clone().add(this.prochaineDirection.applyAxisAngle(new THREE.Vector3(1,0,0), AobToX).multiplyScalar(this.rayon)),
//	        pos.clone().add(this.prochaineDirection.applyAxisAngle(new THREE.Vector3(0,1,0), AobToY).multiplyScalar(this.rayon)),
//	        pos.clone().add(this.prochaineDirection.applyAxisAngle(new THREE.Vector3(0,-1,0), AobToY).multiplyScalar(this.rayon)),
//	        pos.clone().add(this.prochaineDirection.applyAxisAngle(new THREE.Vector3(0,0,1), AobToZ).multiplyScalar(this.rayon)),
//	        pos.clone().add(this.prochaineDirection.applyAxisAngle(new THREE.Vector3(0,0,-1), AobToZ).multiplyScalar(this.rayon))
////	        pos.clone().add(-this.prochaineDirection),
//	];
};

BouleObj.prototype.avancer=function(){
	this.bouleMesh.position.add(this.vecteurGravite);
	if(this.vitesse==0)return;
	this.bouleMesh.position.add(this.mouvement);
	this.nbAvancementAvantMur--;
};
BouleObj.prototype.clone=function(xdec,ydec,zdec){
	var pos = this.bouleMesh.position.clone();
	if(xdec) pos.x+= xdec * 2 * this.rayon;
	if(ydec) pos.y+= ydec * 2 * this.rayon;
	if(zdec) pos.z+= zdec * 2 * this.rayon;
	return new BouleObj(pos.x, pos.y, pos.z, this.vitesse, this.direction);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------
//Class CaisseObj
//------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CaisseObj.typesCaisse = null;
CaisseObj.initialise=function(){
	
	CaisseObj.typesCaisse = {
		'standard':{
			nbHitToBroke:1,
			poid:20,
			bonus:false,
			size:new THREE.Vector3(300,300,300),
			texture:'std',
			points:50
		},
		'dure':{
			nbHitToBroke:2,
			poid:20,
			bonus:false,
			size:new THREE.Vector3(300,300,300),
			texture:'bricks',
			points:100
		},
		'tresDure':{
			nbHitToBroke:4,
			poid:20,
			bonus:false,
			size:new THREE.Vector3(300,300,300),
			texture:'bricks',
			points:100
		},
		'bonusBall':{
			nbHitToBroke:2,
			poid:20,
			bonus:'ball',
			size:new THREE.Vector3(300,300,300),
			texture:'bonusBall',
			points:50
			},
		'tnt':{
			nbHitToBroke:1,
			poid:20,
			bonus:'tnt',
			size:new THREE.Vector3(300,300,300),
			texture:'tnt',
			points:25
		},
		'grille':{
			nbHitToBroke:1,
			poid:20,
			bonus:'grille',
			size:new THREE.Vector3(300,300,300),
			texture:'grille',
			points:25
		}
	};
};
CaisseObj.prototype.getPositionNear=function(orientation){
	var res = this.caisseMesh.position.clone().add(orientation.clone().multiply(this.specif.size));
	res.y -= this.specif.size.y/2;
	return res;
};
function CaisseObj(x, y, z,psType){
	if(CaisseObj.typesCaisse == null)CaisseObj.initialise();
	//Parametres de caisse
	this.specif = psType==undefined?CaisseObj.typesCaisse.standard:CaisseObj.typesCaisse[psType];
	y += this.specif.size.y/2;//change le point de référence de la caisse pour le positionnement

	//Création de l'objet 3D
	this.caisseMesh = new THREE.Mesh( new THREE.BoxGeometry( this.specif.size.x, this.specif.size.y, this.specif.size.z ), new THREE.MeshBasicMaterial( { map:LoaderUtils.getInstance().getTexture('briques', this.specif.texture)} ) );
	this.caisseMesh.position.x=x;
	this.caisseMesh.position.y=y;
	this.caisseMesh.position.z=z;
	this.caisseMesh.caisseObj = this;
	
	//Attributs calculés
//	this.size = {x:sizeX,y:sizeY,z:sizeZ};
	this.hitRestant = this.specif.nbHitToBroke;
	
//	this.notifMesh = new THREEx.Text('+'+this.specif.points+'pts !');
//	this.notifMesh.scale.multiplyScalar(100)
//	this.notifMesh.position.set(x, y+this.specif.size.y, z);
//	this.notifMesh.visible=false;
//	model3D.scene.add(this.notifMesh);
	
	this.notif = new Notification('+'+this.specif.points+'pts !');
	this.notif.notifMesh.position.set(x, y+this.specif.size.y, z);
	model3D.scene.add(this.notif.notifMesh);
}
CaisseObj.prototype.onHit=function(){
	this.hitRestant--;
	if(this.hitRestant==0){
		var n=this.notifMesh;
		this.notif.display();		
		return true;
	}
	return false;
};
CaisseObj.prototype.estDetruite=function(){
	return this.hitRestant==0;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------
//Class Notification
//------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Notification.aAnimer=[];
function Notification(psL, scale){	
	scale=scale|100;
	this.notifMesh = new THREEx.Text(psL);
	this.notifMesh.scale.multiplyScalar(scale);
	this.notifMesh.visible=false;
}
Notification.animate=function(){
	for(var i in Notification.aAnimer){
		 var loNotif = Notification.aAnimer[i];
		 loNotif.rotation.y += 0.02;
		 loNotif.position.y += 40;
	}
};
Notification.prototype.display=function(){
	var n=this.notifMesh;
	var l = Notification.aAnimer.length;
	Notification.aAnimer[l] = n;	
	n.visible=true;
	setTimeout(function(){
		n.visible=false;
		model3D.scene.remove(n);
		Notification.aAnimer.splice(l,1);
	}, 2000)
};

