//variables

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;
var ground
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey = createSprite(30,330,10,10);
  monkey.addAnimation("running",monkey_running);
  
  monkey.scale=0.1;
  ground =createSprite(400,365,900,10);
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  score=0;

}


function draw() {
   background(180);
  //displaying score
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50);
   stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,30,50);
    ground.velocityX = -(4 + 3* score/100)
    if (ground.x < 0){
      ground.x= ground.width/2;
      
    }
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    //add gravity
    monkey.velocityY =monkey.velocityY + 0.8
    monkey.collide(ground);
    spawnObstacles();
    spawnFood();
    if(obstaclesGroup.isTouching(monkey)){
      ground.velocityX = 0;
      monkey.velocityY = 0; 
      
      obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
     
      FoodGroup.setVelocityXEach(0);
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);   
  }
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
  }
  
  
  drawSprites();
}
function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,350,10,40);
   obstacle.velocityX = -(8 + score/100);
   obstacle.addImage("obstacle",obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  } 
}
function spawnFood(){
  if (frameCount  % 85 === 0){
    var banana = createSprite(600,120,10,40);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    //assign lifetime to the variable
    banana.lifetime = 200;
    //add each cloud to the group
    FoodGroup.add(banana);
  }
  
}




