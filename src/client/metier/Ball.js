function Ball(){
    this.proprietes = {
       "code":Ball.codeBall,
       "bonus":null,
       "proprietaire":null
    };
};
Ball.codeball = "stdBall";
module.exports.create={
    "fromProps":function(poProps){
        var poBM = new Ball();
        if(poProps){
            for(var i in poProps){
                poBM[i] = poProps[i];
            }
        }
        return new Ball();
    },
    "from3DModel":function(po3DModel){
        var poBM = new Ball();
        poBM.proprietes.code = po3DModel.type;
    }
};
