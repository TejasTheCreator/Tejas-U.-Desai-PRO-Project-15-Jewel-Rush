var path,boy,cash,diamonds,jewelry,sword;
var pathImg,boyImg,cashImg,diamondsImg,jewelryImg,swordImg,endImg;
var rand, mine_1Img, mine_2Img;
var treasureCollection = 0;
var cashG,diamondsG,jewelryG,swordGroup;
var logo, logoImg;

//Game States
var PLAY=1;
var START=2;
var END=0;
var gameState=2;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  goldImg = loadImage("gold.png");
  mine_1Img = loadImage("mine.jpg");
  mine_2Img = loadImage("mine2.png");
  endImg = loadAnimation("gameOver.png");
  logoImg = loadImage("logo.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.visible = false;
logo = createSprite(200, 275, 200, 100)
logo.addImage("logo", logoImg);
logo.scale = 0.82;

cashG=new Group();
diamondsG=new Group();
goldG=new Group();
mineGroup=new Group();
}

function draw() {
  background(0);

  console.log(gameState);
  if(gameState===START){

  
    text("Click space to start", 125, 365);
    logo.visible = true;


  }else if(gameState===PLAY){
    boy.setAnimation("SahilRunning",boyImg);
    boy.x=70;
    boy.y=580;
    boy.scale=0.08;
    path.velocityY = 4;
    boy.visible = true;
    logo.visible = false;
    


    boy.x = World.mouseX;
  
    edges= createEdgeSprites();
    boy.collide(edges);
  
  //code to reset the background
    if(path.y > 750 ){
      path.y = height/1000000;
    }
  
    createCash();
    createDiamonds();
    creategold();
    createMine();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
     if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }
     if(goldG.isTouching(boy)) {
      goldG.destroyEach();
      treasureCollection= treasureCollection + 150;   
    }
      if(mineGroup.isTouching(boy)) {
        gameState=END;  
  }

  
  }else{
    print("Animation changed.")
    boy.addAnimation("SahilRunning",endImg);
    path.velocityY = 0;

    boy.x=200;
    boy.y=300;
    boy.scale=0.6;
    
    cashG.destroyEach();
    diamondsG.destroyEach();
    goldG.destroyEach();
    mineGroup.destroyEach();
    
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    goldG.setVelocityYEach(0);
    mineGroup.setVelocityYEach(0);
  }
  push();
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,10,30);
  pop();

  if(gameState===START){
    push();
    fill("yellow");
    text("Click space to start", 150, 365);
    pop();
  }
  else if(gameState===END){
    push();
    fill("yellow");
    text("Click space to restart", 150, 365);
    pop();
  }
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 210;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.035;
  diamonds.velocityY = 3;
  diamonds.lifetime = 210;
  diamondsG.add(diamonds);
}
}

function keyPressed(){
  if (gameState == START)
  {
    if(keyCode==32){
      treasureCollection = 0;
      gameState = PLAY
    }
  }
  else if (gameState == END)
  {
    if(keyCode==32){
      treasureCollection = 0;
      gameState = PLAY;
      boy.addAnimation("SahilRunning",boyImg);
      boy.x=70;
      boy.y=580;
      boy.scale=0.08;
      path.velocityY = 4;
    }
  }
}

function creategold() {
  if (World.frameCount % 445 == 0) {
  var gold = createSprite(Math.round(random(50, 350),40, 10, 10));
  gold.addImage(goldImg);
  gold.scale=0.07;
  gold.velocityY = 3;
  gold.lifetime = 210;
  goldG.add(gold);
  }
}

function createMine(){
  if (World.frameCount % 530 == 0) {
  rand = Math.round(random(1, 2));
  var mine = createSprite(Math.round(random(50, 350),40, 10, 10));
  switch (rand)
    {
      case 1:
        mine.addImage("mine1", mine_1Img);
        mine.scale=0.1;
        break;
      case 2:
        mine.addImage("mine2",mine_2Img);
        mine.scale=0.0375;
        break;
      default: 
        break;
    }
  mine.velocityY = 3;
  mine.lifetime = 210;
  mineGroup.add(mine);
  }
}
