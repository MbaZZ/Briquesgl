/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------
//Class briqueScene
//------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function briqueScene(){
	briqueScene.instance = this;
	//Parametres
	this.sizeX = 5000;
	this.sizeY = 3000;
	this.sizeZ = 5000;
	this.gravite = 0;
	
	this.paramPartie;
	
//	this.raqueteSizeX = 13;//doit etre impaire
//	this.raqueteSizeY = 1;//doit etre impaire
//	this.raqueteSeulementSurX = false;
	this.maxSpeed = 100;
	this.minSpeed = 75;
//	this.difficulte = 0;
	this.listner=null;
	//Elements du decors
	this.sol;
//	this.boiteGlobal = new THREE.Box3(new THREE.Vector3(-this.sizeX/2,-this.sizeY/2,-this.sizeZ/2),new THREE.Vector3(this.sizeX/2,this.sizeY/2,this.sizeZ/2));
	this.murs = {};
	this.murArray = [];
	this.boules=[];
	this.boulesMesh = [];	
	
	this.boiteCaisseArray = [];
	this.boiteCaisse = {};
	this.caisses = [];	
	this.caissesMesh = [];
	this.controlsMesh = [];
	
	//gestion des colisions
	this.raycaster = new THREE.Raycaster();	
	
	//Gestion des parties
	this.partiEnCours = false;
	this.pointsMarques = 0;	//TODO séparer par joueurs
	
	this.players = [];
}
briqueScene.prototype.stopRender=function(){
	this.partiEnCours = false;
};
briqueScene.prototype.lancerBoule=function(poBoule){
	this.partiEnCours = true;
	if(!this.est3dGame)poBoule.bouleMesh.position.y= this.murs['sol'].position.y+poBoule.rayon;
	this.boules.push(poBoule);
	this.boulesMesh.push(poBoule.bouleMesh);
};
briqueScene.prototype.addBoule=function(x,y,z, vitesse, direction, couleur){
	var boule = new BouleObj(x,y, z, vitesse, direction, couleur);
	this.boules.push(boule);
	this.boulesMesh.push(boule.bouleMesh);
};
//briqueScene.prototype.initialise=function(pb3dGame){
briqueScene.prototype.initialise=function(poparamPartie){
	this.paramPartie=poparamPartie;
	this.est3dGame=!poparamPartie.raqueteSeulementSurX;
	//Elements calculés
	this.maxX = this.sizeX/2;
	this.minX = - this.maxX;
	this.maxY = this.sizeY/2;
	this.minY = - this.maxY;
	this.maxZ = this.sizeZ/2;
	this.minZ = - this.maxZ;	
	
	// on ajoute une lumière blanche
//	var lumiered = new THREE.HemisphereLight( 0xffffff, 5 );
//	lumiered.position.set( 0, this.sizeY, 0 );
//	model3D.scene.add( lumiered );

	//texture des mures et sol	
	var floorTexture = LoaderUtils.getInstance().getTexture('cube','sol');
	if(this.est3dGame){//initialisation des elements permettant le mode 3D
		this.murHeight = this.sizeY;
		
		var plafondTexture = floorTexture;
		var murTexture = plafondTexture;				
		plafondTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
		plafondTexture.repeat.set( 1, 1 );
		var plafondMaterial = new THREE.MeshBasicMaterial( { map: plafondTexture} );
		var plafond = new THREE.PlaneGeometry(this.sizeX, this.sizeZ, 1, 1);
		webglUtils.setNormal(plafond, new THREE.Vector3(0,-1,0));
		this.murs['plafond'] = new THREE.Mesh(plafond, plafondMaterial);	
		this.murs['plafond'].position.y = this.maxY;
		this.murs['plafond'].rotation.x = Math.PI / 2;
		
		floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
		floorTexture.repeat.set( 1, 1 );
		murTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
		murTexture.repeat.set( 1, 1 );
		var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture,  transparent: true, opacity: 1} );	
		var murMaterial =  new THREE.MeshBasicMaterial( { map: murTexture} );
	}else{
		this.murHeight = 200;
		var murTexture = LoaderUtils.getInstance().getTexture('cube','droite');
		
		//Ajout d'une skybox
//		var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
//		var skyGeometry = new THREE.BoxGeometry( 5010, 5010, 5010 );	
//		
//		var materialArray = [];
//		for (var i = 0; i < 6; i++)
//			materialArray.push( new THREE.MeshBasicMaterial({
//				map: LoaderUtils.getInstance().getTexture('skybox',directions[i]),
//				side: THREE.BackSide
//			}));
//		var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
//		var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
//		var rand = Math.random();
//		if(rand > 0.5)
//			if(rand> 0.75)
//				skyBox.rotation.y = 2*Math.PI / 2;
//			else
//				skyBox.rotation.y = Math.PI / 2;
//		else
//			skyBox.rotation.y = -Math.PI / 2;
//		model3D.scene.add( skyBox );
		
		//Initialisation du decors 2D
		// on ajoute une lumière blanche
		var lumiere = new THREE.DirectionalLight( 0xfffbba, 1 );
		lumiere.position.set( 0, 900, 400 );
		model3D.scene.add( lumiere );
		
		var scale = 1000;
		
		var meshDecor = LoaderUtils.getInstance().getMesh('GameScene');	
		meshDecor.rotation.y = -Math.PI/2;
		meshDecor.position.set(0,-1499,0);
		meshDecor.scale.set( scale,scale,scale );
		model3D.scene.add(meshDecor);
	
		var lumSpotGauche = new THREE.DirectionalLight( 0x7683db, 2.0 );
		lumSpotGauche.position.set(-1.62636*scale, -scale/2, -1.64772*scale );
		model3D.scene.add( lumSpotGauche );
		
		var lumSpotDroit = new THREE.DirectionalLight( 0x7683db, 2.0 );
		lumSpotDroit.position.set(1.62636*scale, -scale/2, -1.64772*scale );
		model3D.scene.add( lumSpotDroit );
		
//		this.ajouterCaisse(1.62636*scale, -scale/2, -1.64772*scale);

		var floorMaterial = new THREE.MeshBasicMaterial( {transparent: true, opacity: 0.9} );	
		var murMaterial =  new THREE.MeshBasicMaterial( {transparent: true, opacity: 0.0} );	
	}
	
	
//	var floorMaterial = new THREE.MeshLambertMaterial( { map: floorTexture} );
	//création d'un sol
	var floorGeometry = new THREE.PlaneGeometry(this.sizeX, this.sizeZ, 1, 1);
	
	var fond = new THREE.PlaneGeometry(this.sizeX, this.murHeight, 1, 1);
	var avant = new THREE.PlaneGeometry(this.sizeX, this.murHeight, 1, 1);
	var droite = new THREE.PlaneGeometry(this.sizeZ, this.murHeight, 1, 1);
	var gauche = new THREE.PlaneGeometry(this.sizeZ, this.murHeight, 1, 1);
	
	webglUtils.setNormal(floorGeometry, new THREE.Vector3(0,-1,0));
	
	webglUtils.setNormal(fond, new THREE.Vector3(0,0,1)); 
	webglUtils.setNormal(avant, new THREE.Vector3(0,0,-1)); 
	webglUtils.setNormal(gauche, new THREE.Vector3(1,0,0)); 	
	webglUtils.setNormal(droite, new THREE.Vector3(-1,0,0));	
	
	this.murs['fond'] = new THREE.Mesh(fond, murMaterial);	
	this.murs['avant'] = new THREE.Mesh(avant, murMaterial);	
	this.murs['droite'] = new THREE.Mesh(gauche, murMaterial);	
	this.murs['gauche'] = new THREE.Mesh(droite, murMaterial);	
	this.murs['sol'] = new THREE.Mesh(floorGeometry, floorMaterial);	
	
	//positionnement
	this.murs['sol'].position.y = this.minY;
	this.murs['sol'].rotation.x = - Math.PI / 2;
//	this.murs['sol'].position.z = 10; //debug
	this.murs['fond'].position.z= -this.sizeZ/2;
	this.murs['avant'].position.z+= this.sizeZ/2;
	this.murs['droite'].position.x+= this.sizeX/2;
	this.murs['droite'].rotation.y = -Math.PI / 2;
	this.murs['gauche'].position.x-= this.sizeX/2;
	this.murs['gauche'].rotation.y = Math.PI / 2;
	this.murs['avant'].rotation.y = Math.PI;
	
	if(!this.est3dGame){	var v = ['fond','avant','droite','gauche'];	for(var i in v)	this.murs[v[i]].position.y = this.minY+this.murHeight/2;}
	for(var i in this.murs){
		this.murs[i].debugName = i;
		this.murs[i].estPiloteParJoueur = false;
		model3D.scene.add(this.murs[i]);
		this.murArray.push(this.murs[i]);		
	}
};
briqueScene.prototype.cameraDessus=function(){
	model3D.camera.position = new THREE.Vector3(0,this.sizeY*2,0);
	model3D.camera.lookAt(new THREE.Vector3(0,0,0));	
};

briqueScene.prototype.addPlayerControl=function(loPlayer){
	loPlayer.paramPartie=this.paramPartie;
	loPlayer.nouvellePartie();
	model3D.scene.add( loPlayer.raquetteMesh );	
	this.controlsMesh.push(loPlayer.raquetteMesh);	
	//Desactivation du mur
	this.murs['avant'].estPiloteParJoueur = loPlayer.raquetteMesh;	
};

briqueScene.prototype.placerMurBrique=function(x,y,z, psType){
	if(psType==undefined) psType='standard';
	if(CaisseObj.typesCaisse == null)CaisseObj.initialise();
	this.ajouterCaisse(x,y+this.murs['sol'].position.y,z);	
	var orientation = new THREE.Vector3(1,0,0).normalize();
	var pos = this.caisses[this.caisses.length-1].getPositionNear(orientation);
	this.ajouterCaisse(pos.x,pos.y,pos.z, 'dure');	
	 pos = this.caisses[this.caisses.length-1].getPositionNear(orientation);
	 pos = this.caisses[this.caisses.length-1].getPositionNear(orientation);
	 this.ajouterCaisse(pos.x,pos.y,pos.z);
};

briqueScene.prototype.ajouterCaisse=function(x,y,z, psType){
	this.listner.ajouterCaisse();
	var caisse = new CaisseObj(x,y,z, psType);
	this.caisses.push(caisse);
	this.caissesMesh.push(caisse.caisseMesh);
	model3D.scene.add(caisse.caisseMesh);	
};

briqueScene.prototype.animate=function(){
	if(!this.partiEnCours) return;	
	for(var i in this.boules){
		var loBoule = this.boules[i];
		var collisions;
		loBoule.bouleMesh.visible = false;//Fait gagner des fps
		loBoule.bouleMeshCamera.updateCubeMap( model3D.renderer, model3D.scene );
		loBoule.bouleMesh.visible = true;

		// Gestion des colisions avec les elements fixes
		
		//------ On vient va rentrer en collision avec un élément
		if(loBoule.nbAvancementAvantMur < 1){
			loBoule.direction = loBoule.prochaineDirection;
			loBoule.mouvement = loBoule.direction.clone().multiplyScalar(loBoule.vitesse);
			this.raycaster.set(loBoule.bouleMesh.position, loBoule.direction.normalize());
			var raysOrig = loBoule.getRaysOrig();			
			if(loBoule.prochaineBriqueTouchee!=null){//------ C'est une brique
				var idCaisse = this.caissesMesh.indexOf(loBoule.prochaineBriqueTouchee.object);
				var caisse = this.caisses[idCaisse];
				//On verifi que la caisse touche n'a pas ete detruite depuis
//				if(caisse == undefined || caisse.estDetruite()){
//				debugger
				if(loBoule.prochaineBriqueTouchee.object.caisseObj.estDetruite()){
//					console.log('Caisse detruite, on continu');
					loBoule.prochaineBriqueTouchee=null;
					loBoule.nbAvancementAvantMur = 0;					
				}else{		
					if(!loBoule.transperceCaisse)
						loBoule.prochaineDirection = loBoule.direction.clone().reflect(loBoule.prochaineBriqueTouchee.face.normal);
					//La caisse va t-elle etre detruite ?
					var lbDetruite = caisse.onHit();
					if(lbDetruite){
						//Gestion des Bonus de caisse
//						switch(caisse.specif.bonus){
//							case 'ball' : this.addPlayerBoule();break;
//							default:break;//Nada bonus
//						}	
						this.listner.declencherBonus(caisse.specif.bonus);
						this.pointsMarques += caisse.specif.points;
						//Destruction de la caisse						
//						delete this.caissesMesh[idCaisse];
						this.caissesMesh.splice(idCaisse, 1);
						this.caisses.splice(idCaisse, 1); //Modif pour suivre l'évolution de ThreeJs
						model3D.scene.remove(loBoule.prochaineBriqueTouchee.object);
					}
					this.listner.taperCaisse(caisse);
					if(loBoule.vitesse > this.minSpeed ) loBoule.vitesse-=50;					
					loBoule.prochaineBriqueTouchee = null;
				}
				
			}else if(loBoule.prochainJoueurConcerne!=null){ //------ c'est un mur geré par un joueur
				//Tentative d'intersection avec la raquette 
				var isTouche = false;
				for(var ir in raysOrig){
					this.raycaster.set(raysOrig[ir], loBoule.direction.normalize());
					collisions = this.raycaster.intersectObject(loBoule.prochainJoueurConcerne);
					if(collisions.length > 0){
						if(this.paramPartie.difficulte == 0) 
							loBoule.prochaineDirection.copy(collisions[0].face.normal);//Version easy
						else
							loBoule.prochaineDirection = loBoule.direction.clone().reflect(collisions[0].face.normal);
						
						if(loBoule.vitesse < this.maxSpeed) loBoule.vitesse+=25;
						isTouche = true;
						break;//1 touché de rayon suffit
					}					
				}
				if(!isTouche){
					var player=loBoule.prochainJoueurConcerne.player;
					if(player.filet!=null){
						loBoule.prochaineDirection = loBoule.direction.clone().reflect(player.filet.geometry.faces[0].normal);
//						loBoule.prochaineBriqueTouchee = null;
						loBoule.prochainJoueurConcerne=null;					
						player.toucherFilet();
						console.log('Merci filet');
						return false;
					}else{			
	//					console.log('Raté !');
						//Suppression de la balle
						model3D.scene.remove(loBoule.bouleMesh);
						this.pointsMarques -= 50;
	//					delete this.boulesMesh[i];
	//					delete this.boules[i]; 
						this.boulesMesh.splice(i, 1);//Modification depuis evolution framwork Threejs
						this.boules.splice(i, 1);
						loBoule.vitesse = 0;
						this.listner.perdreBalle();
					}
				}
				loBoule.prochainJoueurConcerne=null;
			}else{//------ On a rien touché, calcul de la prochaine collision
				
				// 1 - Test avec les caisse
//				console.log('va t-on toucher une caisse ?');
				
				var plusProche = null;				
				for(var ir in raysOrig){
					this.raycaster.set(raysOrig[ir], loBoule.direction.normalize());
					collisions = this.raycaster.intersectObjects(this.caissesMesh);					
					if(collisions.length > 0){
						if(plusProche==null || plusProche.distance < collisions[ 0 ].distance){
							plusProche = collisions[ 0 ];
							plusProche.ray = raysOrig[ir];
						}
					}					
				}
				if(plusProche!=null){
//					console.log('Une caisse en vue !');
					//On va touche une caisse ! 
					loBoule.prochaineBriqueTouchee = plusProche; //TODO
					loBoule.nbAvancementAvantMur = (plusProche.distance - loBoule.rayon)/loBoule.vitesse;
				}else{
					// 2 - Test avec les murs car pas de caisse dans la direction					
					for(var ir in raysOrig){
						this.raycaster.set(raysOrig[ir], loBoule.direction.normalize());
//						collisions = this.raycaster.intersectObjectsOneResult(this.murArray);
						collisions = this.raycaster.intersectObjects(this.murArray);
						if(collisions.length > 0){
//							console.log('Un mur en vue !');
							if(!collisions[ 0 ].object.estPiloteParJoueur){				
								loBoule.prochaineDirection = loBoule.direction.clone().reflect(collisions[0].face.normal);
							}else{
								loBoule.prochainJoueurConcerne = collisions[ 0 ].object.estPiloteParJoueur;//raquette du joueur
							}
							loBoule.nbAvancementAvantMur = (collisions[0].distance - loBoule.rayon )/loBoule.vitesse; //calcul du nombre d'unite d'avancement avant obstacle
							break;
						}				
					}
				}
			}
		}else{
		//gestion des colision avec les autres boules		
//			if(parseInt(loBoule.nbAvancementAvantMur) % parseInt(2*loBoule.rayon/loBoule.vitesse) == 1){
//			if(i % 2 == 1){
				this.raycaster.set(loBoule.bouleMesh.position, loBoule.direction.normalize());
				this.raycaster.far = loBoule.rayon+loBoule.vitesse;
//				collisions = this.raycaster.intersectObjectsOneResult(this.boulesMesh);
				collisions = this.raycaster.intersectObjects(this.boulesMesh);
				if(collisions.length > 0 && collisions[0].distance - loBoule.vitesse < 100){
					var loBouleColi = collisions[0].object.BouleObj;
					var liVitesse = (loBouleColi.vitesse + loBoule.vitesse)/2;
					loBoule.vitesse = liVitesse;
					loBouleColi.vitesse = liVitesse;
					loBoule.prochaineDirection = loBoule.direction.reflect(collisions[0].face.normal);
//					loBoule.prochaineDirection = loBoule.direction.reflect(loBouleColi.direction).add(collisions[0].face.normal).normalize();
					//Si mode 2D alors on supprime toute les composantes Y du vecteur de direction pour ne pas faire monter la balle
					loBoule.nbAvancementAvantMur = 0;
					loBouleColi.prochaineDirection = loBouleColi.direction.reflect(loBoule.direction);
	//				loBouleColi.prochaineDirection = loBoule.prochaineDirection.clone().negate().add(collisions[0].face.normal).normalize();
					loBouleColi.nbAvancementAvantMur = 0;				
				
					loBoule.prochainJoueurConcerne = null;//Correction de bug defaite lors d'une colision de 2 boules
					loBouleColi.prochainJoueurConcerne = null;
					if(this.paramPartie.raqueteSeulementSurX){
						loBoule.prochaineDirection.y=0;loBoule.prochaineDirection.normalize();
						loBouleColi.prochaineDirection.y=0;loBouleColi.prochaineDirection.normalize();
					}			
				}
				this.raycaster.far = Infinity;//remet le parametre dans son etat
//			}
			//Gestion de la gravite A revoir ^^
			if(this.gravite > 0){
				var grav = (this.gravite * loBoule.poid);
				if(loBoule.bouleMesh.position.y - loBoule.rayon > this.minY){
					loBoule.vecteurGravite.y -= grav;//;
	//				console.log('tombe de '+loBoule.vecteurGravite.y + ' la boule est a ' + loBoule.bouleMesh.position.y)
				}else{
					var lastGravite = loBoule.vecteurGravite.y/1.5;	
					loBoule.vecteurGravite.y = 0;
					if(lastGravite < -0.5){
						console.log('rebond' + lastGravite);
						loBoule.vecteurGravite.y = -lastGravite;
	//					loBoule.vecteurGravite.normalize()			
//						loBoule.prochaineDirection.add(loBoule.vecteurGravite);loBoule.prochaineDirection.normalize();
					}else{
						loBoule.vecteurGravite.y = 0;
						loBoule.vecteurGravite.normalize();
						loBoule.prochaineDirection.y = 0;
						loBoule.prochaineDirection.normalize();
					}
				}		
			}
			loBoule.avancer();
		}		
	}	
};	
briqueScene.prototype.startRender=function(){
	var liVitesseProd=1;
	switch (parseInt(this.paramPartie.difficulte)) {
		case 1:liVitesseProd=1.5;break;
		case 2:liVitesseProd=2;break;
		case 3:liVitesseProd=3;break;
		default:liVitesseProd=1;break;
	}
	this.minSpeed*=liVitesseProd;
	this.maxSpeed*=liVitesseProd;
	briqueScene.render();
};
briqueScene.render=function(){
requestAnimationFrame( briqueScene.render);
	model3D.renderer.render( model3D.scene, model3D.camera );
	briqueScene.instance.animate();
	Notification.animate();
	model3D.stats.update();
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------
//Outils de debug
//------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
briqueScene.prototype.cameraLibre=function(){
	model3D.camera.lookAt(new THREE.Vector3(0,0,0));
	model3D.controls = new THREE.OrbitControls( model3D.camera, model3D.renderer.domElement );
};
briqueScene.renderCameraLibre=function(){
	requestAnimationFrame( briqueScene.renderCameraLibre);
	if(model3D.controls!=null)model3D.controls.update();
	model3D.renderer.render( model3D.scene, model3D.camera );
	briqueScene.instance.animate();
	model3D.stats.update();
};
briqueScene.prototype.startCameraBoullesRender=function(loBoule){
	this.partiEnCours=true;
	model3D.cameraBoule = loBoule;
	loBoule.indexAvancement = 0;
	briqueScene.renderCameraBoulle();
	model3D.boulSelected = 0;
	//Permet de changer de boule
	var loScene=this;
	document.addEventListener('keyup',function(event){
		switch( event.keyCode){
			case 37 : loScene.listner.navigationBallePrec() ;break;//fleche gauche
			case 39: loScene.listner.navigationBalleSuiv();break;//fleche droite
			default:break;
		}		
	},false);
};
briqueScene.renderCameraBoulle=function(){
	requestAnimationFrame( briqueScene.renderCameraBoulle);
	model3D.renderer.render( model3D.scene, model3D.camera );
	briqueScene.instance.animate();	
	var loBoule =  model3D.cameraBoule;	
	if(loBoule.nbAvancementAvantMur > 50 && loBoule.indexAvancement > 50){
		model3D.camera.position = loBoule.bouleMesh.position.clone().sub(loBoule.direction.clone().multiplyScalar(800));	
		model3D.camera.lookAt(loBoule.bouleMesh.position.clone().add(loBoule.mouvement.clone().multiplyScalar(loBoule.nbAvancementAvantMur)));
		console.log('suivi positon camera');
	}else{
		model3D.camera.lookAt(loBoule.bouleMesh.position.clone());
		if(loBoule.nbAvancementAvantMur  < 1){
			loBoule.indexAvancement = 0;
		}
	}
	loBoule.indexAvancement++;	
	model3D.stats.update();
};