var React = require('react');
var Render3D = require('../../3Dviews/render.jsx6').default;
module.exports = React.createClass({
  render: function() {
   return (
        <div>
            <div className="thumbnail">
		<Render3D />
            </div>
            <div className="Caption">
                Caption here !
            </div>
        </div>
    );
  }
});
