'use strict';

var React = require('react');
var State = require('../State');
var DarkJedisContainer = require('./DarkJedisContainer.jsx');
var ButtonsContainer = require('./ButtonsContainer.jsx');
var PlanetHeader = require('./PlanetHeader.jsx');

var App = React.createClass({
  render: function(){
    if (State.get().status === 'loading') {
            return <div>Loading</div>;
        }

    return (

      <div className="css-root">
        <PlanetHeader
          currentLocation={State.get().currentLocation}
        />
        <section className="css-scrollable-list">
          <DarkJedisContainer
            currentLocation={State.get().currentLocation}
            darkjedis={State.get().darkjedis}
          />
        <ButtonsContainer
          endOfApprenticeSiths={State.get().endOfApprenticeSiths}
          endOfMasterSiths={State.get().endOfMasterSiths}
          disableButtons={State.get().disableButtons}
          />
        </section>
      </div>
    )
  },

  componentDidMount: function () {
        var me = this;

        // Make the app reactive
        State.on('update', function () {
            me.forceUpdate();
        });
    }
});

module.exports = App;
