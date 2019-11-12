var express = require('express');

var app = express();

var http = require('http').createServer(app);

/*
var server = app.listen(process.env.PORT || 3000,"127.0.0.1",listen);


function listen(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://' + host + ':' + port);
}*/

http.listen(3000,'192.168.31.148',function(){
  console.log('listening on *:3000');
});

app.use(express.static('public'));

var io = require('socket.io')(http);




app.get('/',function(req,res){

  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    //console.log('a user connected');
   
   socket.on('chat message' , function(msg){
       // console.log('message:  ' + msg);
       io.emit('chat message', msg);
     
   });
      socket.on('nickname' , function(msg2){
       // console.log('message:  ' + msg);
       io.emit('nickname', msg2);
     
   });
    socket.on('mouse' , function(msg3){
       
       io.emit('mouse', msg3);
	   //console.log('x: ' + msg3.x + ", y: "+ msg3.y);
   });
    socket.on('mouseDown' , function(msg4){
       
       io.emit('mouseDown', msg4);
	  // console.log('x: ' + msg3.x + ", y: "+ msg3.y);
   });
    socket.on('mousetouch' , function(msg5){
       
       io.emit('mousetouch', msg5);
	  // console.log('x: ' + msg5.x + ", y: "+ msg5.y);
   });   
      
   
   
});


