var React = require('react');
var jade = require('react-jade');

var template = jade.compileFile(__dirname + '/template.jade');

React.render(template({local: 'values'}), document.getElementById('container'));
