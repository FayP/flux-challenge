'use strict';

var WebSocket = require('ws');
var request = require('request');
var State = require('../State');

//websockets
var currentLocation = new WebSocket('ws://localhost:4000');

//Record if we should render master or apprentice data to the UI.
var masterApprentice = "apprentice";

var fetchDarkJedis = function(id){
  if(!id){
    return;
  }
  //using a http get request to grab the jedi data
  request('http://localhost:3000/dark-jedis/' + id, {protocol:'http:'}, function(error, response, body){
    var jedi = JSON.parse(body);

    State.get().set({
      status: 'ready',
      darkjedis: getDarkJedisArray(jedi)
    });

    if(State.get().darkjedis.length < 5){
      State.trigger('jedis:fetch', jedi[masterApprentice].id);
    }

  });
}

var getDarkJedisArray = function(jedi){
  var darkjedis = State.get().darkjedis;

  if(masterApprentice === "apprentice"){
    if(darkjedis.length >= 5){
      darkjedis.splice(darkjedis[darkjedis.length] - 1, darkjedis[darkjedis.length]);
    }
    darkjedis.push(jedi);
  } else {
    if(darkjedis.length >= 5){
      darkjedis.splice(0, 1);
    }
    darkjedis.unshift(jedi);
  }

  return darkjedis;
}

State
  .on('jedis:fetch', function(id){
    fetchDarkJedis(id);
  })

 .on('navigation', function(direction){
   var darkjedis = State.get().darkjedis,
   id = (direction === "up") ? darkjedis[0].master.id : darkjedis[darkjedis.length -1].apprentice.id;
   masterApprentice = (direction === "up") ? "master" : "apprentice";

   fetchDarkJedis(id, direction);
 })

 .on('buttons:all-disabled', function(state){
   State.get().set({
     disableButtons: state
   })
 })

 .on('buttons:down-disabled', function(state){
   State.get().set({
     endOfApprenticeSiths: state
   });
 })

.on('buttons:up-disabled', function(state){
  State.get().set({
    endOfMasterSiths: state
  });
})

.on('location:fetch', function(){
  //using websockets to grab the location data.
  currentLocation.onmessage = function(event){
    State.get().set({status: 'loading'});
    State.get().set({
      status: 'ready',
      currentLocation: JSON.parse(event.data)
    });
  }
});
