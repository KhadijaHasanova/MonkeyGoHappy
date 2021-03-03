var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var bananaImage, stoneImage;

var score = 0;

function preload(){
  //load the background image
  backImage=loadImage("images/jungle.jpg");

  //load the images for the player
  player_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png");
  
  //load image for banana
  bananaImage = loadImage("images/banana.png");
  
  //load image for the obstacle
  stoneImage = loadImage("images/stone.png");

  //load the image for game over
  gameOverImg = loadImage("images/gameOver.png");
}

function setup() {
  createCanvas(600,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible = false;

  //create the food group
  foodGroup = new Group();
  
  //create the obstacle group
  obstacleGroup = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    //reset the background
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
    
    //spawn the bananas
    spawnBananas();
    
    //spawn the obstacles
    spawnObstacles();

    //destroy the food when the monkey touches the banana
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score + 2;
      player.scale += 0.02;
    }
  
    //make the player jump when space is clicked
    if(keyDown("space") && player.y > 200 ) {
      player.velocityY = -12;
    }
    
    //give gravity to the player
    player.velocityY = player.velocityY + 0.8;
  
    //let the player collide with the ground
    player.collide(ground);
    
    //end the game when the player collides with an obstacle
    if(player.collide(obstacleGroup)) {
      gameState = END;
    }
  }
  
  if(gameState === END) {
    //display the image for gameOver
    image(gameOverImg,100,150);

    //make the player invisible
    player.visible = false;

    //make the backgorund invisible
    backgr.visible = false;

    //destroy the rocks and 
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }

  //draw the sprites
  drawSprites();

  //display the score
  if(gameState === PLAY) {
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: " + score,250,50);
  }
}

function spawnBananas()  {
  if(frameCount % 80 === 0){
    banana = createSprite(600,Math.round(random(120,200)),10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -8;
    banana.lifetime = 600;
    foodGroup.add(banana);
  }
}


function spawnObstacles()  {
  if(frameCount % 100 === 0){
    obstacle = createSprite(600,330);
    obstacle.addImage(stoneImage);
    obstacle.scale = 0.09;
    obstacle.velocityX = -8;
    obstacle.lifetime = 600;
    obstacleGroup.add(obstacle);
  }
}