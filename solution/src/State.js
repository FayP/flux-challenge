'use strict';

var Freezer = require('freezer-js');

var State = new Freezer({
    status: 'loading',
    darkjedis: [],
    currentLocation: {},
    endOfApprenticeSiths: false,
    endOfMasterSiths: false,
    disableButtons: false
});

module.exports = State;
