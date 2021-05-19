var START=0;
var PLAY=1;
var END=2;
var END2=3;
var gameState=START;
var bgimg1,bg1;
var playbutton,playimg;
var bg2,bgimg2;
var inviground;
var brokenbuild,brokenimg;
var witch,witchimg;
var heroright,heroleft,heroshield,herogem,herostand,hero;
var invi1,invi2;
var meteor,meteorgrp,meteorimg;
var gem,gemimg,gemgrp;
var score=0;
 var deadbutton,deadimg;
 var bg3,bg3img
 var vicbutton,vicbuttonimg;
function preload(){
  bgimg1=loadImage('background 1.jpg')
  playimg=loadImage('play button.jpg')
  bgimg2=loadImage('background.jpg')
  brokenimg=loadImage('broken building.jpg')
  witchimg=loadImage('witch-removebg-preview.png')
heroright=loadAnimation('moving_right_hero-removebg-preview.png')
heroleft=loadAnimation('moving_left_hero-removebg-preview.png')
heroshield=loadAnimation('hero_using_shield-removebg-preview.png')
herogem=loadAnimation('hero_taking_gem-removebg-preview.png')
herostand=loadAnimation('standing_hero-removebg-preview.png')
meteorimg=loadImage('meteor_image-removebg-preview.png')
gemimg=loadImage('gem-removebg-preview.png')
deadimg=loadImage('dead_button-removebg-preview.png')
bgimg3=loadImage('background 1.jpg')
vicbuttonimg=loadImage('victory_button-removebg-preview.png')
}
function setup(){
  createCanvas(windowWidth,windowHeight)
  bg1=createSprite(200,400,1600,1600)
  bg1.addImage(bgimg1)
bg1.scale=2.5
bg2=createSprite(200,400,20,20)
  bg2.addImage(bgimg2)
bg2.scale=2.5
bg2.visible=false;
hero=createSprite(650,630,20,20)
hero.addAnimation("standing",herostand)
hero.addAnimation("movingright",heroright)
hero.addAnimation("movingleft",heroleft)
hero.addAnimation("pickinggem",herogem)
hero.addAnimation("usingshield",heroshield)
hero.scale=0.45
hero.visible=false;
deadbutton=createSprite(500,300,20,20)
deadbutton.addImage(deadimg)
 deadbutton.visible=false;  
 bg3=createSprite(200,400,1600,1600)
 bg3.addImage(bgimg3)
bg3.scale=2.5
vicbutton=createSprite(500,300,20,20)
vicbutton.addImage(vicbuttonimg)
 vicbutton.visible=false;  
meteorgrp=new Group();
gemgrp=new Group();
}
function draw(){
  
background(0)
drawSprites();
if(gameState===START){
  score=0;
  fill('black')
  textSize(30)
  text('AGE OF EXTERMINATION',300,60)
  fill('pink')
  text('STORY',50,155)
  textSize(15)
  fill('blue')
  text('Queen Eliza,the queen of Saturn has her eyes on Earth. She has already destructed several buildings with her supernatural powers.' ,50,205)
  text('The meteors are ruining everything that comes in their path. You are the savier of the planet and now have to tackle the meteors and ',50,230)
  text('gather the gems falling from sky.',50,255)
  fill('red')
  textSize(30)
  text('AIM',50,310)
  textSize(15)
  fill('green')
  text('You have to collect 50 gems to save the world.',50,340)
  fill('red')
  textSize(30)
  text('HOW TO PLAY',50,400)
  textSize(15)
  fill('yellow')
  text('[Use the LEFT ARROW to move left]',50,450)
  text('[Use the RIGHT ARROW to move right]',50,480)
  text('[Use the UP ARROW to make shield ]',50,510)
  text('[Use the DOWN ARROW to collect gems]',50,540)
  fill('white')
  textSize(22)
  text('IF YOU HAVE THE COURAGE TO FIGHT WITH ELIZA,THEN CLICK PLAY OR ELSE RETURN!',17,600)
deadbutton.visible=false;
   playbutton =createSprite(500,665,20,20);
  playbutton.addImage(playimg)
 
  if(mousePressedOver(playbutton)){
    gameState=PLAY;
  }
}

if(gameState=== PLAY){
  
  bg2.visible=true;
   bg2.depth=playbutton.depth+2;
   var inviground=createSprite(480,732,1000,10);
   
brokenbuild=createSprite(150,506,20,20)
brokenbuild.addImage(brokenimg)
brokenbuild.scale=0.4
brokenbuild.collide=inviground;
witch=createSprite(150,200,20,20)
witch.addImage(witchimg);
witch.scale=0.3
hero.visible=true;

hero.depth=bg2.depth+1;
invi1=createSprite(1000,630,20,20)
invi1.depth=bg2.depth+1
invi1.shapeColor="red"
hero.collide(invi1)
hero.collide(brokenbuild)
fill('red')
textSize(20)
text("GEMS COLLECTED:"+score,600,30)
if(hero.isTouching(gemgrp) && keyDown("down")){
  gemgrp.destroyEach();
  score=score+1
}
if(keyDown("right")){
   hero.changeAnimation("movingright",heroright)
   hero.velocityX=(8 + 3*score);
   hero.scale=1.005
   hero.y=620
 }
 
 if(keyDown("left")){
  hero.changeAnimation("movingleft",heroleft)
   hero.velocityX=-(8 + 3*score);
   hero.scale=0.45
   
 }
 if(keyDown("up")){
   hero.changeAnimation("usingshield",heroshield)
   hero.scale=0.4
   hero.velocityX=0
 }
 if(keyDown("down")){
  hero.changeAnimation("pickinggem",herogem)
  hero.velocityX=0;
  hero.scale=0.45
  
 }
 if(hero.isTouching(meteorgrp) && keyDown("up")){
  meteorgrp.destroyEach();
  score=score-5
}
 
spawnmeteor();
spawngem();
if(meteorgrp.isTouching(hero)){
  gameState=END;
//}
if(score===50){
  gameState=END2;
}
  }
}
 else if(gameState===END){
  
   hero.velocityX=0
  bg3.visible=true;
  bg3.depth=witch.depth+2;
deadbutton.visible=true;
deadbutton.depth=bg3.depth+1;
meteorgrp.setLifetimeEach(-1);
    gemgrp.setLifetimeEach(-1);
    fill('red')
    textSize(20)
    text("YOU DIED!",480,550)
    if(mousePressedOver(deadbutton)){
      bg1.visible=true;
    bg2.visible=false;
    gameState=START;
   // hero.velocityX=10+score
    }
}
else if(gameState===END2){
  hero.velocityX=0
  bg3.visible=true;
  bg3.depth=witch.depth+2;
vicbutton.visible=true;
vicbutton.depth=bg3.depth+1;
meteorgrp.setLifetimeEach(-1);
    gemgrp.setLifetimeEach(-1);
    fill('green')
    textSize(20)
    text("YOU SAVED THE WORLD!",450,550)
    if(mousePressedOver(vicbutton)){
      bg1.visible=true;
    bg2.visible=false;
    vicbutton.visible=false;
    gameState=START;
}

}
function spawnmeteor(){
  if(frameCount%120===0){
    
    meteor= createSprite(400, 30, 50, 50);
    meteor.addImage(meteorimg)
    meteor.scale=0.3
    meteor.x=Math.round(random(750,350))
    meteor.velocityY=(10 + 3*score/10);
    meteor.lifetime=200;
    meteor.setCollider("rectangle", 0, 0, 20, 80, -45);
meteor.debug =false;;
   meteorgrp.add(meteor)
   
    
   
  }
  
  }
  function spawngem(){
    if(frameCount%120===0){

    
    gem=createSprite(meteor.x,meteor.y,20,20)
    gem.x=Math.round(random(750,350))
    gem.velocityY=(5 + 3*score/10);
    gem.scale=0.2
    gem.addImage(gemimg)
   gem.lifetime=200;
    gemgrp.add(gem)
    }
  
  }
}
