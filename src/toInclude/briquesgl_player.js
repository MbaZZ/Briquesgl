function Player(scene, viewZone){
	this.scene=scene;
	this.partie;		
	
	this.nbCaissesWin = 0;
	this.pointsMarques = 0;
	
	this.boules=[];
	this.boulesMesh = [];	
	this.boulesNonLancee = [];	
	this.paramPartie;
	
	//Creation du joueur et ajout dans la partie
	this.model3D=webglModel3D.getInstance();
	this.model3D.setNewRendu(viewZone);
	
	this.camera=this.model3D.camera;
	this.renderer=this.model3D.renderer;
	
	this.derniereBouleLance=null;
	this.filet=null;
	this.raquette=null;
}

Player.prototype.nouvellePartie=function(){
	this.camera.position.set(0,0,this.scene.murs['avant'].position.z + this.scene.sizeY);
	this.camera.lookAt(new THREE.Vector3(0,0,0));
	
	if(this.paramPartie.raqueteSeulementSurX!=true){
		//Creation de la raquette : level3D
		if(this.paramPartie.difficulte == 0){
			var maxXDef=0.6; var maxYDef=0.1;		
		}else{
			var maxXDef=0.2; var maxYDef=0.05;
		}
		var nbCarresX = this.paramPartie.raqueteSizeX;//doit etre impaire
		var nbCarresY = this.paramPartie.raqueteSizeY; //doit etre impaire
		var geometry = new THREE.BoxGeometry (1200, 600, 2, nbCarresX,nbCarresY);
		var xMax=nbCarresX==1?0:maxXDef, xpas = nbCarresX==1?0:xMax/((nbCarresX-1)/2);//0.1;
		var yMax=nbCarresY==1?0:maxYDef, ypas = nbCarresY==1?0:yMax/((nbCarresY-1)/2);//0.05;
		var liFirstIface = nbCarresX * nbCarresY *2 + nbCarresY*4 + nbCarresX*4;//calcul du premier id face aux balles
	
	//	Pour chaque face coté balles
		var indexCarre = 0, curY = yMax, curX = xMax;
		for(var iface = liFirstIface; iface<geometry.faces.length; iface++){		
			var carreSuivant = iface%2 == 1;	
			geometry.faces[iface].num = indexCarre;				
			geometry.faces[iface].normal.x = curX;
			geometry.faces[iface].normal.y = curY;
			geometry.faces[iface].normal.normalize();
			if(carreSuivant){
				curX-=xpas;
				if(curX<-xMax){
					curY-=ypas;
					curX = xMax;
				}
				indexCarre++;
			}	
		}	
		
		var material = new THREE.MeshBasicMaterial( { wireframe: true, transparent: true, opacity: 0.5 } );
		this.raquetteMesh = new THREE.Mesh( geometry, material );
	}else{
		//Creation de la requette : Level 2D
		this.raquetteMesh = LoaderUtils.getInstance().getMesh('raquette');
		this.raquetteMesh.scale.set( 500,500,500 );
		this.camera.position.y+=500;
		this.camera.rotation.x=-Math.PI/16;
	}
	this.raquetteMesh.position.copy(this.scene.murs['avant'].position);
	this.raquetteMesh.player = this;
	
	//Permet de calculer la vitesse de la raquette lors de chaque mouvement (a terminer)
//	this.raquetteMesh.lastPosition = new THREE.Vector3();
//	this.raquetteMesh.lastPosition.copy(this.raquetteMesh.position);
	
	//Ajout d'un plan pour projeter les coordonéess de la souris
	var geoPlan = new THREE.PlaneGeometry(this.scene.sizeX*2, this.scene.sizeY*2, 1, 1);
	var texturePlan = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0.0 } );
	var plan = new THREE.Mesh(geoPlan, texturePlan);
	plan.position.copy(this.scene.murs['avant'].position);
	model3D.scene.add( plan );	
	
	for(var i in this.boulesNonLancee){
		var loBoule = this.boulesNonLancee[i];
		loBoule.bouleMesh.visible = true;
		loBoule.bouleMesh.position.copy(this.raquetteMesh.position);
//		loThis.boulesNonLancee[i].bouleMesh.position.z += 200;
		if(this.paramPartie.raqueteSeulementSurX)loBoule.bouleMesh.position.y += loBoule.rayon;
	}
	
	var loThis = this;	
	var liDemiRaquetteX=loThis.scene.sizeX/2;
	//gestion du controle
	document.addEventListener( 'mousemove', function(event){		
		event.preventDefault();
		//1 calcul de la position du clic relative au canva (pos haut à gauche = 0,0)
		var pos = GetScreenCordinates(loThis.renderer.domElement);
		var mouse = {x:event.clientX-pos.x, y:event.clientY-pos.y};		
		
		var vector = new THREE.Vector3( ( mouse.x / loThis.renderer.domElement.offsetWidth ) * 2 - 1, - ( mouse.y / loThis.renderer.domElement.offsetHeight ) * 2 + 1, 0 );
		vector.unproject(model3D.camera);
		loThis.scene.raycaster.set(loThis.camera.position, vector.sub( loThis.camera.position ).normalize() );
		var intersects = loThis.scene.raycaster.intersectObject(plan);
		var vitesse;		
		if ( intersects.length > 0 ) {
//			vitesse = loThis.raquetteMesh.lastPosition.sub(loThis.raquetteMesh.position);
//			debugger
//			if(vitesse.x != 0 && vitesse.y != 0 && vitesse.z != 0){
//				console.log('lift');
//			}
//			loThis.raquetteMesh.lastPosition.copy(loThis.raquetteMesh.position);
			if(Math.abs(intersects[0].point.x) < Math.abs(liDemiRaquetteX - loThis.raquetteMesh.scale.x) ){			
				loThis.raquetteMesh.position.x = intersects[0].point.x;
				if(!loThis.paramPartie.raqueteSeulementSurX){
					loThis.raquetteMesh.position.y = intersects[0].point.y;
				}
				for(var i in loThis.boulesNonLancee){
					var loBoule = loThis.boulesNonLancee[i];
					loBoule.bouleMesh.visible = true;
					loBoule.bouleMesh.position.copy(loThis.raquetteMesh.position);
		//				loThis.boulesNonLancee[i].bouleMesh.position.z += 200;
					if(loThis.paramPartie.raqueteSeulementSurX)loBoule.bouleMesh.position.y += loBoule.rayon;
				}
			}
		}
	}, false );
	
};

Player.prototype.addBoule=function(boule){
	if(!this.scene.murs['avant'].estPiloteParJoueur){
		var boule = new BouleObj(0, 0, 0, this.scene.minSpeed, new THREE.Vector3(0,0,-1));
		boule.bouleMesh.visible = false;
	}else{
		var rqPos = this.scene.murs['avant'].estPiloteParJoueur.position;
		var boule = new BouleObj(rqPos.x, rqPos.y, rqPos.z, this.scene.minSpeed, new THREE.Vector3(0,0,-1));		
	}
	this.boulesNonLancee.push(boule);
	this.scene.listner.gagnerBalle();
};

Player.prototype.lancerBoule=function(){
	if(this.boulesNonLancee.length == 0) return;	
	var loBoule = this.boulesNonLancee[0];
	this.boulesNonLancee.shift();
	this.scene.lancerBoule(loBoule);
	this.derniereBouleLance = loBoule;
};

Player.prototype.perdreBoule=function(){
};
Player.prototype.mettreFilet=function(lsItemID){
	//Ajout d'un plan bonus
	var txtPlanBonus = THREE.ImageUtils.loadTexture(Utils.getAbsUrl('files/img/cubeTexture/filet.png'));
	var matPlanBonus = new THREE.MeshLambertMaterial({map:txtPlanBonus, transparent: true, opacity: 1});//{ color: 0x5b92d7, transparent: true, opacity: 0.4 } );
	this.filet = new THREE.Mesh( new THREE.PlaneGeometry(1000, 50, 1, 1), matPlanBonus);
	this.filet.position.set(0,200,5000);
	model3D.scene.add( this.filet );
};
Player.prototype.toucherFilet=function(){
//	model3D.scene.remove( this.filet );
//	this.filet=null;
};
Player.prototype.activerTranspersor=function(){
	this.derniereBouleLance.transperceCaisse=true;
};
Player.prototype.agrandirRaquette=function(){
	this.raquetteMesh.scale.x *= 2;
	this.raquetteMesh.scale.y *= 1.5;
};
Player.prototype.ralentirBalle=function(){
	this.derniereBouleLance.vitesse = 15;
};
Player.prototype.notifier=function(psText){
	var n = new Notification(psText);
	n.notifMesh.position.set(0,200,0);
	this.derniereBouleLance.bouleMesh.add(n.notifMesh);
	n.display();
};

