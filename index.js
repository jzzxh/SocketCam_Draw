var express = require('express');

var app = express();

var http = require('http').createServer(app);

var s_id;

var allClients = new Set();
/*
var server = app.listen(process.env.PORT || 3000,"127.0.0.1",listen);


function listen(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://' + host + ':' + port);
}*/

http.listen(process.env.PORT || 3000,function(){
  console.log('listening on *:3000');
});

app.use(express.static('public'));

var io = require('socket.io')(http);




app.get('/',function(req,res){

  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    
    
     allClients.add(socket.id);
    
     console.log('Connect ID: ' + socket.id);
      
     s_id = socket.id;
   
     io.emit('connectID',JSON.stringify(Array.from(allClients)));
     
     console.log("connectID: " + JSON.stringify(Array.from(allClients)));
    
    socket.on('mouse' , function(msg3){
        
        var data = {
          x: msg3.x,
          y: msg3.y,
          id: s_id,
          r: msg3.r,
          g: msg3.g,
          b: msg3.b
        };
       
       io.emit('mouse', data);
       
     //  console.log(msg3.r);
	   //console.log('x: ' + msg3.x + ", y: "+ msg3.y);
   });
    socket.on('mouseDown' , function(msg4){
       
       io.emit('mouseDown', msg4);
     
	  // console.log('x: ' + msg3.x + ", y: "+ msg3.y);
   });
    socket.on('mousetouch' , function(msg5){
       
       io.emit('mousetouch', msg5);
	   //console.log('x: ' + msg5.x + ", y: "+ msg5.y);
	  
   });   
   
   
    socket.on('image64' , function(msg){
       
       io.emit('image64', msg);
       
	   console.log('Base64: '+ msg);
	  
   });     
      
   socket.on('disconnect', function(){
        
        allClients.delete(socket.id);
        
        io.emit('connectID',JSON.stringify(Array.from(allClients)));
        
        console.log("Disconnect ID: " + socket.id);
        console.log("connectID: " + JSON.stringify(Array.from(allClients)));
       
   });
   
});


