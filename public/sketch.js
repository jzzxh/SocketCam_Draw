
var socket;
var touch_state = 0;
var capture;

var mouseXs;
var mouseYs;
var cR;
var cG;
var cB;



function setup(){
   // createCanvas(400, 400);
    createCanvas(windowWidth, windowHeight);
    background(235);
    socket = io.connect('https://jzzxhsocket.herokuapp.com/');
    //socket = io.connect('http://192.168.0.108:3000');
    
    
    cR = random(100,255);
    cG = random(100,255);
    cB = random(100,255);
    c = color(cR,cG,cB);
    
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
    
    
    console.log(FRUBIL.device.brand);
    
}

function draw(){
   
   if(touches.length > 1){
       background(255);
    cR = random(100,255);
    cG = random(100,255);
    cB = random(100,255);
    c = color(cR,cG,cB);       
   }
   
   image(capture, 0, 0, 320, 240);
   
  /*
   fill(255,0,0);
   noStroke();
   ellipse(mouseXs, mouseYs, 15, 15);
   */
   
   let s = "你好，" + FRUBIL.device.brand;
    fill(20);
    textSize(24);    
    text(s,10,10,70,80);
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
    
    stroke(c);
    strokeWeight(5);
    line(mouseX,mouseY,pmouseX,pmouseY);

    //ellipse(mouseX, mouseY, 15, 15);
   // sendmouse(int(mouseX),int(mouseY));
   sendmouse(int(mouseX),int(mouseY),int(cR),int(cG),int(cB));
  // prevent default
  return false;
}

function mouseDragged() {
  // Draw some white circles
  /*
  fill(0,255,0);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  */
  
  //console.log("R: " + cR)
  
  stroke(c)
  strokeWeight(5);
  line(mouseX,mouseY,pmouseX,pmouseY);
  // Send the mouse coordinates
  sendmouse(int(mouseX),int(mouseY),int(cR),int(cG),int(cB));
}

// Function for sending to the socket
function sendmouse2(xpos, ypos,_r,_g,_b) {
  // We are sending!
 // console.log("sendTouch: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    r: _r,
    g: _g,
    b: _b
  };

  // Send that object to the socket
  socket.emit('mousetouch',data);
}

// Function for sending to the socket
function sendmouse(xpos, ypos,_r,_g,_b) {
  // We are sending!
//  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    r: _r,
    g: _g,
    b: _b
  };
  
 

  // Send that object to the socket
  socket.emit('mouse',data);
}