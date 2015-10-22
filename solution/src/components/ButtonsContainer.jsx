'use strict';

var React = require('react');
var State = require('../State');

var ButtonsContainer = React.createClass({

  render: function(){
    var downDisabled = (this.props.endOfApprenticeSiths || this.props.disableButtons);
    var upDisabled = (this.props.endOfMasterSiths || this.props.disableButtons);
    var downClassName = "css-button-down" + ((downDisabled) ? " css-button-disabled" : "");
    var upClassName = "css-button-up" + ((upDisabled) ? " css-button-disabled" : "");

    return (
      <div className="css-scroll-buttons">
        <button
          disabled = {upDisabled}
          className={upClassName}
          onClick={this.onButtonClick.bind(this, "up")}
          ></button>
        <button
          disabled = {downDisabled}
          className={downClassName}
          onClick={this.onButtonClick.bind(this, "down")}
          >
        </button>
      </div>
    );
  },

  shouldComponentUpdate: function(nextProps){
    return nextProps.disableButtons !== this.props.disableButtons || nextProps.endOfApprenticeSiths !== this.props.endOfApprenticeSiths || nextProps.endOfMasterSiths !== this.props.endOfMasterSiths;
  },

  onButtonClick: function(direction){
    State.trigger('navigation', direction);
  },
});

module.exports = ButtonsContainer;
