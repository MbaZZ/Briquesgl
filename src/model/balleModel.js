function balleModel(){
    this.proprietes = {
       "type":0,
       "bonus":null
    };
};
exports.create={
    "fromProps":function(poProps){
        var poBM = new BalleModel();
        if(poProps){
            for(var i in poProps){
                poBM[i] = poProps[i];
            }
        }
        return new balleModel();
    },
    "from3DModel":function(po3DModel){
        var poBM = new balleModel();
        poBM.proprietes.type = po3DModel.type;
    }
};
