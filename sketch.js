var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver, gameOverImg;
var boyparado;

//Estados do jogo
var PLAY=1;
var END=0;
var estado=1;
estado = PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameOver.png");
  boyparado = loadAnimation("dead man-02 (1).png");
}

function setup(){
  
  createCanvas(400,600);
// Movendo plano de fundo
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;

//criar menino correndo 
boy = createSprite(70,550,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.depth = 3;
boy.setCollider("circle",0,0,40);
boy.debug = false;
boy.addAnimation("morto", boyparado);

  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

gameOver = createSprite(150,200,50,50);
gameOver.addImage(gameOverImg);
gameOver.visible = false;
gameOver.scale = 0.5

}

function draw() {

  
  if(estado===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para redefinir plano de fundo
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      //aumente a treasureCollection para 50
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
   
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150;

          }
    else{
      if(swordGroup.isTouching(boy)) {           
        estado = END;
        MORTE();
        swordGroup.destroyEach();
        diamondsG.destroyEach();
        cashG.destroyEach();
        jwelleryG.destroyEach();
        
    }

  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouro: "+ treasureCollection,150,30);
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
  cashG.depth = 2;
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 210;
  diamondsG.add(diamonds);
  diamondsG.depth = 2;
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 210;
  jwelleryG.add(jwellery);
  jwelleryG.depth = 2;
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 210;
  swordGroup.add(sword);
  swordGroup.depth = 2;
  }
}

function MORTE(){
  gameOver.addImage("morreu", gameOverImg);  
  swordGroup.setVelocityYEach(0);
  diamondsG.setVelocityYEach(0);
  cashG.setVelocityYEach(0); 
  jwelleryG.setVelocityYEach(0);
  boy.velocityY=0;
  path.velocityY = 0;
  boy.changeAnimation("morto",boyparado);
  gameOver.visible = true;

}

