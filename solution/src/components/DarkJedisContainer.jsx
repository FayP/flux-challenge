'use strict';

var React = require('react');
var DarkJedi = require('./DarkJedi.jsx');
var State = require('../State');

var DarkJedisContainer = React.createClass({
  render: function(){
    var currentLocation = this.props.currentLocation;
    var oneDarkJediOnPlanet = this.props.darkjedis.some(function(jedi){
      return jedi.homeworld.id === currentLocation.id;
    });

    State.trigger('buttons:all-disabled', oneDarkJediOnPlanet);

    var darkjedis = this.props.darkjedis.map(function(jedi, index){
      State.trigger('buttons:down-disabled', !jedi.apprentice.id);
      State.trigger('buttons:up-disabled', !jedi.master.id);

      return (
        <DarkJedi
          key = {index}
          jedi = {jedi}
          currentLocation={currentLocation}
        />
      )
    });

    return (
        <ul className="css-slots">
        {darkjedis}
        </ul>
    )
  },

  componentDidMount: function(){

  },

  shouldComponentUpdate: function(nextProps){
    return nextProps.currentLocation !== this.props.currentLocation || nextProps.darkjedis !== this.props.darkjedis;
  }
});

module.exports = DarkJedisContainer;
