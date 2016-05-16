var React = require('react');
var GameMenu = require('./GameMenu.jsx');
var Preview3D = require('./Preview3D.jsx');
module.exports = React.createClass({
  render: function() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-5">
                    <GameMenu data={this.props.data.menu}/>
                </div>
                <div className="col-sm-5">
                    <Preview3D />
                </div>
            </div>
        </div>
    );
  }
});
