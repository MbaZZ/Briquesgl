var dataState={
   pseudo:"Toto 1er",
   gameMenu:"",
   difficulte:"Dure",
   stage:"Lois de la brique",
   level:"leve1"

}
function StateChanger(){
    this.pfs=[];
    var loThis=this;
    var it = setInterval(function(){
        for(var i in loThis.pfs){
            loThis.pfs[i](dataState);
        }
    }, 500);
}
StateChanger.prototype.addCallBack=function(pfCall){
   this.pfs.push(pfCall); 
};
var gstate = new StateChanger();

var React = require('react');
// tutorial2.js
var ElementMenu = React.createClass({
  getInitialState: function() {
    console.log('ici');
    return {data: []};
  },
  componentDidMount: function() {
    console.log('ici!');
        var loThis=this;
        gstate.addCallBack(function(dataIn){
            loThis.setState({data:dataIn});
        });
  },
  render: function() {
    return (
      <a className="list-group-item" data-gameMenuElemId="{this.prop.data.idElem}">
        {this.props.children} - 
        <input type="text" value={this.state.data[this.props.data.id]} placeholder="Your name" />
      </a>
    );
  }
});

var ListElementMenu = React.createClass({
  render: function() {
    var ElemNode = this.props.data.map(function(dataElem){
        return (
           <ElementMenu data={dataElem}>{dataElem.libel}</ElementMenu> 
        );
    });
    return (
       <div>
       {ElemNode} 
       </div>
    );
  }
});
var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});
module.exports = React.createClass({displayName: 'GameMenu',
  render: function() {
    return (
      <div className="GameMenu">
        <div class="list-group">
            <h1>{this.props.data.title}</h1>
            <ListElementMenu data={this.props.data.listElems} />
        </div>
      </div>
    );
  }
});
