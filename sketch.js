//Create variables here
var dog, happyDog, database, foodS, foodStock,milk1;
var feed,addFood;
var feedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  Dog=loadImage("images/dog.png");
  HappyDog=loadImage("images/dogimg.png");
  milk1 =loadImage("Milk.png");
  
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();

 dog = createSprite(400,500,5,5);
 dog.addImage(Dog);

 foodObj = new Food();

 feed=createButton("Feed The Dog");
 feed.position(700,95);
 feed.mousePressed('feedDog');

 addFood=createButton("Feed The Dog");
 addFood.position(700,95);
 addFood.mousePressed('addFoods');


  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  

background(46, 139, 87);
foodObj.display();

feedTime= database.ref('feedTime');
feedTime.on("value",function(data){
  lastFed= data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("last Feed : " +lastFed%12+ "PM",350,30);
} else if(lastFed==0) {
  text("last Feed : 12 Am",350,30);
} else{
  text("last Feed : "+lastFed+"AM",350,30);
}

  drawSprites();
  //add styles here
  

stroke(255);
textSize(40);
fill("yellow");
text("food: " + foodS,200,200);
}

function feedDog(){
dog.addImage(HappyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
 Food: foodObj.getFoodStock(),
 feedTime:hour()
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

if(x<=0){
  x=0;
}else{
  x=x-1;
}
  database.ref('/').update({
    'Food':x
  })
}