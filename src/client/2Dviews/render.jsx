var Home = require('./reactElem/Home.jsx6').default;
function LayoutManager(){
    this.state = {};
}
LayoutManager.prototype.render=function(psRenderName, poData){
    var React = require('react');
    var ReactDOM = require('react-dom');
    switch(psRenderName){
        case 'Home':
            ReactDOM.render(
              <div>
               <Home data={poData}/>
              </div>,  document.getElementById('content')
            );
            break;
        default:
            console.log('render ' + psRenderName + ' introuvable ! ');
            break;
    }
}
module.exports=new LayoutManager();
