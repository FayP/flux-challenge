'use strict'

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./src/components/App.jsx');
var State = require('./src/State');
require('./src/reactions/reactions');

State.trigger('location:fetch');
State.trigger('jedis:fetch', '3616');


ReactDOM.render(
    React.createElement(App, null),
    document.getElementById('app-container')
);
