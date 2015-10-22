'use strict';

var React = require('react');

var DarkJedi = React.createClass({
  propTypes: {
    jedi: React.PropTypes.object.isRequired
  },
  render: function(){
    var jedi = this.props.jedi;
    var spottedClass = (this.props.currentLocation.id === jedi.homeworld.id) ? "red-sith" : "";
    var className = "css-slot " + spottedClass;

    return(
      <li className={className}>
          <h3>{jedi.name}</h3>
          <h6>{jedi.homeworld.name}</h6>
        </li>
    );
  },

  shouldComponentUpdate: function(nextProps){
    return nextProps.jedi !== this.props.jedi || nextProps.currentLocation !== this.props.currentLocation;
  }
});

module.exports = DarkJedi;
