function PartieModel(poData){
	/* $data=array(
			'pseudo' => 'PasDeNom',
			'scoresTotalCumule' => 0,
			'difficulte' => 1,
			'objetsSpeciaux'=>array(),
			'level' => array(
					'enCours' => -1,
					'termines'=>array()
					)
			);
	*/
	this.data=poData;//Récupéré depuis le serveur
	this.updateRequest=new RequestControl();
	this.updateRequest.setParams('briquesgl/setParam');
}
PartieModel.prototype.sync=function(){
	this.updateRequest.addData('setParam', this.data);
	Dispatcher.jouerRequestAjax(this.updateRequest);
};
PartieModel.prototype.updateData=function(poData){
	console.log('PartieModel : data receive');
	this.data=poData;
	
	
};
PartieModel.prototype.enregistrerVictoire=function(piScore, piTempsMit){
	this.enregistrerFinDeNiveau(true, piScore, piTempsMit);
};
PartieModel.prototype.enregistrerDefaite=function(piScore, piTempsMit){
	this.enregistrerFinDeNiveau(false, piScore, piTempsMit);
};
PartieModel.prototype.enregistrerFinDeNiveau=function(lbAGagne, psLevel, score, tempsMit){
//	Logger::tracerErreur("Une partie se termine sur le niveau ".this.data['level']['enCours']);
//	this.loadData();
	
//	if(this.data['level']['enCours'] != psLevel){
//		Logger::tracerWarning('Une partie vient de se terminer sur le niveau '.psLevel.' pourtant le niveau '.this.data['level']['enCours'].' avait été initialisé');
//		this.data['level']['enCours'] = psLevel;
//		//TODO voir si requeteID tout ca tout ca, un jour p-e
////			return false;
//	}
	
	//enregistrement du niveau
	var newNiveau={
			'libel' : this.data['level']['enCours'],
			'score' : score,
			'temps' : tempsMit,
			'difficulte' : this.data['difficulte']
	};
	//TODO calcul des score en fct du temps restant...
	//On regarde si le score est meilleurs que celui eventuellemnt déjà enregistré sur le niveau
	$lvlTermines=this.data['level']['termines'];
	$lvlEnCours=this.data['level']['enCours'];
	scoreAEnlever=0;
	if(isset($lvlTermines[$lvlEnCours])){			
		if($lvlTermines[$lvlEnCours]['score'] < score){
			scoreAEnlever = $lvlTermines[$lvlEnCours]['score'];
			this.data['level']['termines'][$lvlEnCours]=$newNiveau;
		}
					
	}else{
		this.data['level']['termines'][$lvlEnCours]=$newNiveau;
	}
		
	
	this.data['scoresTotalCumule'] += score - scoreAEnlever;		
	this.data['level']['enCours'] = -1;
	this.saveData();
}
/*

function ajouterObjetSpecial($idObjet){
	this.loadData();
	if(!isset(this.data['objetsSpeciaux'][$idObjet])){
		this.data['objetsSpeciaux'][$idObjet]=1;
	}else{			
		this.data['objetsSpeciaux'][$idObjet]++;
	}
	Logger::tracerInfo('Un nouvel objet '.$idObjet.', qte : '.this.data['objetsSpeciaux'][$idObjet]);
	this.saveData();
}
function utiliserObjetSpecial($idObjet){
	this.loadData();
	if(!isset(this.data['objetsSpeciaux'][$idObjet])){
		Logger::tracerInfo("L'objet '.$idObjet.' n'est pas disponible !");
		return false;
	}else{
		if(this.data['objetsSpeciaux'][$idObjet] > 1)
			this.data['objetsSpeciaux'][$idObjet]--;
		else
			unset(this.data['objetsSpeciaux'][$idObjet]);
		this.saveData();
		return true;		
	}		
}

function initierLevel(psLevel){
	Logger::tracerErreur("Une partie débute sur le niveau ".psLevel);
	this.loadData();
	this.data['level']['enCours'] = psLevel;
	this.saveData();
}
*/