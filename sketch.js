
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY=1
var END=0
var jungle,jungleImage;
var gameState=PLAY


function preload(){
  
  //jungleImage= loadImage("jungle.jpg")
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(450, 300);
  //creating monkey
   monkey=createSprite(80,150,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  /*jungle=createSprite(225,150)
  jungle.addImage(jungleImage)*/
  
  /*background=createSprite(225,300)
  background.addImage(jungle)*/
  
  ground = createSprite(400,280,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  monkey.debug=false;
  obstaclesGroup.debug=false;
  
}


function draw() {
  
  background(225);
  
    if(gameState===PLAY){
       if(ground.x<0) {
          ground.x=ground.width/2;
          }
       
      
      if(keyDown("space")&&monkey.y>200 ) {
      monkey.velocityY = -12;
          }
       
      monkey.velocityY = monkey.velocityY + 0.9;
         
       monkey.collide(ground);   
       spawnFood();
       spawnObstacles();
       
     if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
     score=score+2
         }
     
    if(obstaclesGroup.isTouching(monkey)){
        
         gameState=END;
    
        }
    
    
    }
  else if(gameState===END){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        
  }
  
   
    
   
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
 
  
    
  
  stroke("black");
  textSize(10);
  text("Survival Time: "+ score, 100,50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.07;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(310,260,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle 
    
    obstacle.lifetime = 50;
    obstacle.debug=false;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstaclesGroup.setColliderEach("circle",0,0,200)
  }
}
