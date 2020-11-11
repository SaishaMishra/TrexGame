var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var cactus,cactusImage1, cactusImage2,cactusImage3,cactusImage4,cactusImage5,cactusImage6, cactusGroup;

var gameOver, gameOverImage,restart, restartImage
var a;

var score=0;

var newImage;
var play=1;
var end=0;
var gamestate=play;

var jumpSound, checkPoint, dieSound;

localStorage["highestScore"]=0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  cactusImage1=loadImage("obstacle1.png")
  cactusImage2=loadImage("obstacle2.png")
  cactusImage3=loadImage("obstacle3.png")
  cactusImage4=loadImage("obstacle3.png")
  cactusImage5=loadImage("obstacle5.png")
  cactusImage6=loadImage("obstacle6.png")
  
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  
  jumpSound=loadSound("jump.mp3")
  checkPoint=loadSound("checkPoint.mp3")
  dieSound=loadSound("die.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  trex.setCollider("rectangle",0,0,150,90);
trex.debug=true; 
 
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  gameOver=createSprite(300,100,10,10);
  gameOver.addImage(gameOverImage)
  
  restart=createSprite(300,150,10,10);
  restart.addImage(restartImage);
  restart.scale=0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  
cloudsGroup=new Group()
  cactusGroup=new Group()  
}

function draw() {
  background(180);
  
  if(gamestate===play){
    ground.velocityX = -4-score/150;
    if(score%150==0&&(score>1)){
      checkPoint.play();
    }
    score=score+Math.round(getFrameRate()/61);   
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
    jumpSound.play();
  }
    trex.velocityY = trex.velocityY + 0.8  
    if (ground.x < 0){
    ground.x = ground.width/2.1;
      
  }
    restart.visible=false;
    gameOver.visible=false;
    
  if(trex.isTouching(cactusGroup)) {
    gamestate=end;
    //jumpSound.play();
    //trex.velocityY=-13;
    dieSound.play();
  }  
   
   spawnClouds();
  
  spawnCactus(); 
    
  }
  else if(gamestate===end){
    dieSound.play();
  ground.velocityX=0;
   cactusGroup.setVelocityXEach(0); 
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-4);
    cactusGroup.setLifetimeEach(-4)
    trex.changeAnimation("collided",trex_collided);
     restart.visible=true;
    gameOver.visible=true;
    trex.velocityY=0;
    if(mousePressedOver(restart)){
   reset(); 
 }
    
    
  }
  
  
 
   
   
   
  text("score="+score,500,50)

  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  
  drawSprites();
  
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime=210;    
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
    }
}

function spawnCactus(){
 if(frameCount% 150===0) {
   cactus=createSprite(600,165,10,10);
   cactus.velocityX=-(3+score/70);
  // switch cases
   a=Math.round(random(1,6))
   switch(a){
       case 1:cactus.addImage(cactusImage1);
  break;
       case 2:cactus.addImage(cactusImage2)
  break;
       case 3:cactus.addImage(cactusImage3)
  break;     
       case 4:cactus.addImage(cactusImage4)
  break;
       case 5:cactus.addImage(cactusImage5)
  break;
       case 6:cactus.addImage(cactusImage6)
  break;
       default: break;
   }
   cactus.scale=0.6;
   cactus.lifetime=210;
   cactusGroup.add(cactus);
    console.log(cactus.velocityX)
 }
  

}
function reset(){
  score=0;
  cloudsGroup.destroyEach();
  cactusGroup.destroyEach();
  gamestate=play;
  trex.changeAnimation("running", trex_running);
  if(localStorage["highestScore"]<score){
    localStorage["highestScore"]=score;
  }

}







