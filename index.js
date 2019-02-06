var express = require('express');
var Promise = require('promise');
var app = express();
const config = require('./config');


var rout = require('./bookRouter/bookRouter');

app.use('/', rout);

var serverrunning= new Promise(function(resolve,reject){

 if(resolve){
   resolve("I'm runing On");
 }else {
   reject("not running");
 }
});

app.listen(config.app.port,serverrunning.then(function(itsresolve){
  console.log(itsresolve);
  console.log(process.env.NODE_ENV , config.app.port);

}));
