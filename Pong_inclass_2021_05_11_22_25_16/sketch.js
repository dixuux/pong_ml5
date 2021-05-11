let video; 
let poseNet; 
let leftPaddlePos, rightPaddlePos; 
let PaddleLength = 100;
let PaddleWidth = 40;

let ballPos, ballVel; 
let ballRadius = 40; 

function setup() {
  createCanvas(640, 480);
  
  video = createCapture(VIDEO);
  video.hide();
  
  leftPaddlePos = createVector(10, -1);
  rightPaddlePos = createVector(width - 50, -1);
  
  ballPos = createVector(width/2, height/2);
  ballVel = createVector(3,2);
  
  poseNet = ml5.poseNet(video);//if poseNet recognize an event which is when there is a person in the image.
  poseNet.on('pose', resultHandler);//this is the fucntion postNet runs when it recognize a pose event.This is how javascript works. 
}

function resultHandler(result){
  //console.log(result);
  if(result[0] != undefined){
    leftPaddlePos.y = result[0].pose.leftWrist.y;//access the y value of the left paddle position and storing the position of leftWrist in there.
    rightPaddlePos.y = result[0].pose.rightWrist.y;
  }

}
  

function draw() {
  background(220);
  
  push(); //mirroring video
  translate(video.width,0); 
  scale(-1, 1); //flipping
  image(video, 0, 0); 
  pop();
  

  
  if(leftPaddlePos.y > 0 && rightPaddlePos.y > 0){
    fill(0,0,255);
    rect(leftPaddlePos.x, leftPaddlePos.y, PaddleWidth, PaddleLength);
    fill(255, 0, 0);
    rect(rightPaddlePos.x, rightPaddlePos.y, PaddleWidth, PaddleLength);
    
    fill(0,255,0);
    circle(ballPos.x, ballPos.y, ballRadius*2);
    
    if((ballPos.x +ballRadius >= rightPaddlePos.x && ballPos.y >= rightPaddlePos.y && ballPos.y <=rightPaddlePos.y+PaddleLength) || (ballPos.x - ballRadius <= leftPaddlePos.x + PaddleWidth && ballPos.y <=leftPaddlePos.y + PaddleLength)){
      ballVel.x *= -1; 
    } 
    
    
    if(ballPos.y + ballRadius >= height || ballPos.y - ballRadius <= 0){
      ballVel.y *= -1; 
    }
    
    ballPos.add(ballVel);
  } //do something is a pose has been recognized at least once.
}