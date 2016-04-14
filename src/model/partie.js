var balleModel = require('./balleModel');

function joueurModel(){
    this.proprietes = {
        "pseudo":"pasDeNom",
        "score":0,
        "bonus":0,
        "balles:{
            "restantes":0,
            "utilisees":0,

        },
        "pouvoirs":[];
        "partieEnCours":null,
    };
}

joueurModel.prototype.addBalle=function(){
    
};
