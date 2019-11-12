
var socket;
var touch_state = 0;
var capture;

var mouseXs;
var mouseYs;


function setup(){
    createCanvas(400, 400);
    //background(0);
    socket = io.connect('https://jzzxhsocket.herokuapp.com/');
    
    capture =  createCapture({
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  });    
    capture.hide();
    capture.size(320, 240);
}

function draw(){
   
   if(touches.length > 1){
       background(255);
   }
   
   image(capture, 0, 0, 320, 240);
   
   fill(255,0,0);
   noStroke();
   ellipse(mouseXs, mouseYs, 15, 15);
    
}

function touchStarted(){
    
    touch_state = 1;
    //console.log("Touch_state: " + touch_state);
    socket.emit("mouseDown", 1);
    return false;
}

function touchEnded(){
    
    touch_state = 0;
   // console.log("Touch_state: " + touch_state);
    socket.emit("mouseDown", 0);
    return false;
}

function touchMoved() {
    
    mouseXs = mouseX;
    mouseYs = mouseY;

    //ellipse(mouseX, mouseY, 15, 15);
    sendmouse(int(mouseX),int(mouseY));
  // prevent default
  return false;
}

function mouseDragged() {
  // Draw some white circles
  fill(0,255,0);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function sendmouse2(xpos, ypos) {
  // We are sending!
  console.log("sendTouch: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mousetouch',data);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}