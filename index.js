var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var at = app();

at.use(app.static('public'));

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
	  // console.log('x: ' + msg3.x + ", y: "+ msg3.y);
   });
    socket.on('mouseDown' , function(msg4){
       
       io.emit('mouseDown', msg4);
	  // console.log('x: ' + msg3.x + ", y: "+ msg3.y);
   });
      
   
   
});

http.listen(3000,function(){

  console.log('listening on *:3000');

});
