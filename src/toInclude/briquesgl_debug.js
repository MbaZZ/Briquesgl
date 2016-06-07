//////////////////////// Niveaux tests ///////////////////////////////////
briquesglView.prototype.levelGravity=function(data){//TODO debug gravity 9 mouvement
	var scene = this.scene;
	scene.raqueteSizeX = 9;
	scene.raqueteSizeY = 3;
	scene.gravite = 0.1;
	scene.initialise(true);
	scene.ajouterCaisse(0, -500, 0);
	scene.addBoule(-100,520,-200, 20, new THREE.Vector3(0,0,1));	
	scene.addPlayerControl();	
	scene.startRender();	
};
briquesglView.prototype.testColision=function(data){
	var scene = this.scene;
	scene.initialise(true);
	scene.maxSpeed=50;
	scene.minSpeed=50;
	debugger
	scene.addBoule(500,null,1000, 50, new THREE.Vector3(0,0,1));
//	scene.addBoule(500,null,800, 50, new THREE.Vector3(0,0,-1));
//	scene.addBoule(200,0,1000, 50, new THREE.Vector3(0,0,1));
//	scene.addBoule(200,null,800, 50, new THREE.Vector3(0,0,-1));
//	scene.addBoule(800,null,800, 50, new THREE.Vector3(-1,0,0));
//	scene.addBoule(800,null,1000, 50, new THREE.Vector3(-1,0,0));
//	scene.addBoule(800,null,600, 50, new THREE.Vector3(-1,0,0));
//	scene.addBoule(800,null,400, 50, new THREE.Vector3(-1,0,0));
//	scene.addBoule(1000,null,800, 50, new THREE.Vector3(1,0,0));
//	scene.addBoule(1000,null,1000, 50, new THREE.Vector3(1,0,0));
//	scene.addBoule(1000,null,600, 50, new THREE.Vector3(1,0,0));
//	scene.addBoule(1000,null,400, 50, new THREE.Vector3(1,0,0));
	scene.startCameraBoullesRender(scene.boules[0]);
};
briquesglView.prototype.reproBug=function(data){
	var scene = this.scene;
	scene.sizeY = 2000;
	scene.sizeX = 3000;
	scene.initialise(true);
//	scene.maxSpeed=120;
//	scene.minSpeed=75;
//	scene.raqueteSizeX=7;
//	scene.raqueteSizeY=3;	
	scene.ajouterCaisse(0, scene.minY, -2200, 'tresDure');
	
	//Les boules se traversent
	//Cas 1
//	scene.addBoule(600,0,0, 10, new THREE.Vector3(-0.22,-0.59,-1).normalize());
//	scene.addBoule(-600,0,0, 10, new THREE.Vector3(0.22,-0.59,-1).normalize());	
	//Cas 2 
	scene.addBoule(600,0,0, 10, new THREE.Vector3(-0.3,-0.4,-1).normalize());
	scene.addBoule(-600,0,0, 20, new THREE.Vector3(0.3,-0.4,-1).normalize());
	//FIN
	scene.startCameraBoullesRender(scene.boules[0]);
};