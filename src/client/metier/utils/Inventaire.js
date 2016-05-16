module.exports={
    "create":function(){
       return new Inventaire(); 
    }
};
function Inventaire(){
    this.nbRestant = 0;
    this.nbAjoute = 0;
    this.items = [];
};
Inventaire.prototype.addItem = function(poItem){
    this.nbAjoute++;
    this.nbRestant++;
    if(this.items[this.getCode(poItem)]){
        var loItem = this.items[poItem.code];
        loItem.quantite++;
    }else{
        this.items[this.lastId] = poItem;
        if(poItem.onAdd){
            poItem.onAdd();
        }
        poItem.quantite++;
    }
};
Inventaire.prototype.useItem = function(pCode){
    if(!pCode) pCode="std";
    this.nbRestant--;
    if(this.nbRestant<1 || !this.items[pCode]) return null
    var loItem = this.items[pCode];
    if(loItem.onUse){
        loItem.onUse();
    }
    this.items[pCode].quantite--;
    if(loItem.quantite<1)this.items[pCode]=null;
    return loItem;
};
Inventaire.prototype.getCode = function(pObject){
    if(!pObject.code) pObject.code = "std";
    return pObject.code;
};