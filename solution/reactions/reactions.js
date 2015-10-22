'use strict';

var State = require('../State');
var WebSocket = require('ws');
var ws = new WebSocket(BASEURL+'/dark-jedis/3616');
//constants
var BASEURL = 'http://localhost:3000/';

State.on('worlds:fetch', function(){})
      .on('jedis:fetchNext', function(){

      })
      .on('jedis:fetchDarthSidious', function(){
        State.get().set({status: 'loading'});

      ws.on('open', function(req, res){
          console.log(res);
          State.get().set({
              jedis: res,
              status: 'ready'
          });
        });

      })
      .on('navigation:up', function(){})
      .on('navigation:down', function(){});
