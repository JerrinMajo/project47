var player,playerImg;
var backgroundImg;
var arrow,arrowImg,arrowGroup;
var zombies,zombieImg,zombiesGroup;
var score=0;


function preload(){
  playerImg=loadImage("assets/hawkeye1.png");
  backgroundImg=loadImage("assets/background.png");
  arrowImg=loadImage("assets/arrow.png");
  zombieImg=loadImage("assets/chitauri2.png")

}

function setup(){
  createCanvas(windowWidth,windowHeight);

  player=createSprite(200,450);
  player.addImage("player",playerImg);
  player.scale=0.7;

  zombiesGroup=new Group();
  arrowGroup=new Group();

}
function draw(){
  background(backgroundImg);

  if(keyDown(UP_ARROW)){
    player.y=player.y-5;
  }

  if(keyDown(DOWN_ARROW)){
    player.y=player.y+5;
  }

  
  if(keyDown("space")){
    createArrow();
  }

  textSize(40);
  fill("blue");
  text("Score: "+score,1000,100);



  if(zombiesGroup.isTouching(arrowGroup)){
    for(var i=0;i<zombiesGroup.length; i++){
      if(zombiesGroup[i].isTouching(arrowGroup)){
        score=score+1;
        zombiesGroup[i].destroy();
        arrowGroup.destroyEach();
       }
    }
  }

  createZombies();

  drawSprites();
}

function createArrow(){
   arrow=createSprite(100,100,10,10);
   arrow.addImage(arrowImg);
   arrow.scale=0.05;
   arrow.x=player.x+40;
   arrow.y=player.y-45;
   arrow.velocityX=4;
   arrow.lifetime=windowHeight/4;
   arrowGroup.add(arrow);
}

function createZombies(){
  if(frameCount%60===0){
    zombies=createSprite(random(800,1100),random(300,500),40,40);
    zombies.addImage(zombieImg);
    zombies.scale=0.25;
    zombies.setCollider("rectangle",90,-250,200,200);
    //zombies.debug=true;
    zombies.velocityX=-(4 + score/5);
    zombies.lifetime=400;
    zombiesGroup.add(zombies);
  }


  
}