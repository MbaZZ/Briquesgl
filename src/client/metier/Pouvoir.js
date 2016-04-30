function Pouvoir(){
    this.proprietes = {
       "code":0,
       "bonus":null,
       "proprietaire":null
    };
};
exports.create={
    "fromProps":function(poProps){
        var poBM = new Pouvoir();
        if(poProps){
            for(var i in poProps){
                poBM[i] = poProps[i];
            }
        }
        return new Pouvoir();
    }
};
