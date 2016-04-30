function Caisse(){
    this.proprietes = {
       "code":0,
       "resistance":100,
       "points":100,
       "bonus":false
    };
};
exports.create={
    "fromProps":function(poProps){
        var poBM = new Caisse();
        if(poProps){
            for(var i in poProps){
                poBM[i] = poProps[i];
            }
        }
        return new Caisse();
    }
};
