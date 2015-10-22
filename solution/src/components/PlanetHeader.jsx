'use strict';

var React = require('react');

var PlanetHeader = React.createClass({
  render: function(){
    var text = "Obi-Wan currently on " + this.props.currentLocation.name;
    return(
      <h1 className="css-planet-monitor">{text}</h1>
    )
  },

  shouldComponentUpdate: function(nextProps){
    return nextProps.currentLocation.id !== this.props.currentLocation.id
  }
});

module.exports = PlanetHeader;
