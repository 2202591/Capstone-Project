// Snake, Minesweeper, and block breaker
// Corbin and Peyton
// December 1st, 2025
// CS30 Capstone Project
// Mr. Scott

let gridMines = [];
let gridSnakes = [];

//mineweeper Variables
let squareSize = 30;
let rows =  15;
let cols = 15;

let count = 0;
let mineCount = 0;
let activeMine = 0;
let flagCount = 0;

let game = 0;

function setup() {
  rows+=2;
  cols+=2;
  noStroke();
  textAlign(CENTER, CENTER);
  createCanvas(cols*squareSize, rows*squareSize);
  mineGrid();
  snakeGrid();
  frameRate(6)
}

function draw() {
  textSize(20);
  background(220);
  x = getCurrentX();
  y = getCurrentY();
  if(game === 1) mineSweeper();
  if(game === 2) snake();
  start();
}

// Start Screen
function start() {
  if(game === 0) {
    fill(0);
    square(width*0.33-50, height/2-50, 100);
    square(width*0.66-50, height/2-50, 100);
    fill(255)
    text("MINESWEEPER", width*0.33, height/2);
    text("SNAKE", width*0.66, height/2);
    if(mouseX > width*0.33-50 && mouseX < width*0.33+50) {
      if(mouseY > height/2-50 && mouseY < height/2+50) {
        if(mouseIsPressed) {
          game = 1;
          mineGrid();
        }
      }
    }
    if(mouseX > width*0.66-50 && mouseX < width*0.66+50) {
      if(mouseY > height/2-50 && mouseY < height/2+50) {
        if(mouseIsPressed) {
          game = 2;
          snakeGrid();
          crash = false;
          score = 3;
          snakes = [];
          fruits = [];
          changeDir = 3;
          snakes.push(new Snake(4*squareSize, 7*squareSize));
          snakes.push(new Snake(3*squareSize, 7*squareSize));
          snakes.push(new Snake(2*squareSize, 7*squareSize));
          fruits.push(new Fruit());
          fruits.push(new Fruit());
          fruits.push(new Fruit());
        }
      }
    }
  }
  else {
    fill(255);
    textSize(20);
    text("BACK", width*0.94, height*0.03);
    if(mouseX > width*0.85 && mouseX < width) {
      if(mouseY > 0 && mouseY < height*0.05) {
        if(mouseIsPressed) {
          game = 0;
        }
      }
    }
  }
}

// Minesweeper
function mineSweeper() {
  showGridM();
  checkGrid();
  if(activeMine > 0) activeMine++;
  if(activeMine > 16) youLose();
}

function mineGrid() {  //randomizes grid start
  for (let y = 0; y < rows; y++) {
    gridMines.push([]);
    for (let x = 0; x < cols; x++) {
      gridMines[y].push(1);
    }
  }
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let num = random(1);
      if(x < rows - 1 && x > 0 && y < cols - 1 && y > 0) { //creates grid inside the boarder
        if(num < 0.165) { // frequency of mine placement
          gridMines[y][x] = new DetectorOrMine(x,y,"mine"); //places mine
        }
        else gridMines[y][x] = new DetectorOrMine(x,y,"detector"); //places detector
      }
      else {
        gridMines[y][x] = new DetectorOrMine(x,y,"boarder"); // places bparder
      }
      
    }
  } 
  for (let y = 0; y < rows; y++) { //checks every square to see how many mines are near
    for (let x = 0; x < cols; x++) { 
      if(y > 0 && y < rows-1 && x < cols-1 && x > 0) gridMines[y][x].nearMines();
    }
  }
  for (let y = 0; y < rows; y++) { //reveals all numbers that are beside squares with no mines near
    for (let x = 0; x < cols; x++) { 
      if(y > 0 && y < rows-1 && x < cols-1 && x > 0) gridMines[y][x].noMines();
    }
  }

}

function showGridM() { //displays the grid
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) { 
      gridMines[y][x].display();
    }
  } 
}

function checkGrid() { //checks how many mines, flags, and non mines
  count = 0;
  mineCount = 0;
  activeMine = 0;
  flagCount = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) { 
      if(gridMines[y][x].grass === false && gridMines[y][x].mine !== "mine") {
        count++;  //counts how mamy squares have been clicked
      }
      if(gridMines[y][x].mine === "mine") {
        mineCount++;  //counts # of mines
      }
      if(gridMines[y][x].mine === "mine" && gridMines[y][x].grass === false){
        activeMine = 1;  //checks if a mines has been clicked
      }
      if(gridMines[y][x].flag){
        flagCount++;  //counts # of flags active
      }
    }
  }
  if((rows)*(cols) - mineCount === count && activeMine === 0) {
    youWin();
  }
  if(activeMine === 1) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) { 
        if(gridMines[y][x].mine === "mine") gridMines[y][x].grass = false;
      }
    }
  }
  fill(255);
  text(mineCount-flagCount,width/2,squareSize/2); //prints how many mines are left
}

function youWin() {
  fill(255);
  background(0);
  text("YOU WIN",width/2, height/2);
}

function mousePressed() {
  if(game === 1) {
    if (mouseX <= width & mouseY <= height) { //mouse must be in the canvas
      if (gridMines[y][x].grass){
        if(keyIsDown(17)) { //if ctrl is downn places flags if number of flags > 0
          if(gridMines[y][x].flag === false){
            if(mineCount - flagCount > 0) gridMines[y][x].flag = true;
          }
          else {
            gridMines[y][x].flag = false;  //removes flag if there is a flag already there
          }
        }
        else {
          if(gridMines[y][x].flag === false) { //allows to turnoer new squares if there is no flag
            gridMines[y][x].grass = false;
          }
        }
      }
    }
  }
}


function getCurrentX() { //rounds mouse value to grid x
  let constrainedX = constrain(mouseX, 0, width-1);
  return floor(constrainedX / squareSize);
}

function getCurrentY() { //rounds mouse value to grid y
  let constrainedY = constrain(mouseY, 0, height-1);
  return floor(constrainedY / squareSize);
}

class DetectorOrMine {
  constructor(x,y,mine) { //takes position and type
    this.x = x;
    this.y = y;

    this.mineColor = color(230, 59, 87);  //colors for mine
    this.grassOne = color(199, 227, 113);   //grass colors
    this.grassTwo = color(163, 199, 62);
    this.colorOne = color(238, 230, 199);   //grass colors
    this.colorTwo = color(215, 207, 174);
    this.boarderColor = color(100); //boarder color

    this.flag = false;  //each square starts out as not showing and no flag
    this.grass = true;
    this.mine = mine;
    this.minesNear = 0;
  }

  display() {
    if(this.mine === "mine") this.minesNear = -1;
    if(this.mine === "boarder") this.grass = false; //shows boarder instantly
    if(this.grass === false || this.minesNear === 0) {  //displays grass squares before being turned over
      if (this.mine === "mine") {
        if((this.x+this.y)%2 === 0) fill(this.colorOne); //creates checkerboard pattern
        else fill(this.colorTwo);
        square(this.x*squareSize, this.y*squareSize, squareSize);

        fill(this.mineColor);
        circle((this.x + 0.5)*squareSize, (this.y + 0.5)*squareSize, squareSize/2);
      }
      else if(this.mine === "detector"){ //detector
        if((this.x+this.y)%2 === 0) fill(this.colorOne); //creates checkerboard pattern
        else fill(this.colorTwo);
        square(this.x*squareSize, this.y*squareSize, squareSize);
        if(this.minesNear === 0) this.grass = false;  //shows detectors with no mines near

        fill(0);  //puts text only on squares with mines near
        if(this.minesNear !== 0) text(this.minesNear,(this.x + 0.5)*squareSize, (this.y + 0.5)*squareSize);
      }
      else { //boarder
        fill(this.boarderColor);
        square(this.x*squareSize, this.y*squareSize, squareSize);
      }
    }
    else{
      if(this.flag) {  //makes a flag
        if((this.x+this.y)%2 === 0) fill(this.grassOne);
        else fill(this.grassTwo);
        if(this.mine === "boarder") fill(this.boarderColor);
        square(this.x*squareSize, this.y*squareSize, squareSize);
        
        if(this.mine !== "boarder") { //prevents flags from being placed on boarders
          fill(255,0,0);
          triangle(this.x*squareSize + 13, this.y*squareSize + 5, this.x*squareSize + 22, this.y*squareSize + 10, this.x*squareSize + 13, this.y*squareSize + 15);
          rectMode(CORNERS);
          rect(this.x*squareSize + 13, this.y*squareSize + 5, this.x*squareSize + 11, this.y*squareSize + 25);
          rectMode(CORNER);
        }
      }
      else {
        if((this.x+this.y)%2 === 0) fill(this.grassOne); //still keeps the checkerboard pattern
        else fill(this.grassTwo);
        if(this.mine === "boarder") fill(this.boarderColor);
        square(this.x*squareSize, this.y*squareSize, squareSize);
      }
    }
  }

  nearMines() { //checks how many mines are near each square in a one tile radius
    if(gridMines[this.y-1][this.x].mine === "mine") this.minesNear++;
    if(gridMines[this.y+1][this.x].mine === "mine") this.minesNear++;
    if(gridMines[this.y][this.x-1].mine === "mine") this.minesNear++;
    if(gridMines[this.y][this.x+1].mine === "mine") this.minesNear++;
    if(gridMines[this.y-1][this.x-1].mine === "mine") this.minesNear++;
    if(gridMines[this.y+1][this.x+1].mine === "mine") this.minesNear++;
    if(gridMines[this.y+1][this.x-1].mine === "mine") this.minesNear++;   
    if(gridMines[this.y-1][this.x+1].mine === "mine") this.minesNear++;
  }

  noMines() {
    if(this.mine !== "mine") {  //displays all squares that are next to squares with no mines
      if(gridMines[this.y-1][this.x].minesNear === 0 && gridMines[this.y-1][this.x].mine === "detector") this.grass = false;
      if(gridMines[this.y+1][this.x].minesNear === 0 && gridMines[this.y+1][this.x].mine === "detector") this.grass = false;
      if(gridMines[this.y][this.x-1].minesNear === 0 && gridMines[this.y][this.x-1].mine === "detector") this.grass = false;
      if(gridMines[this.y][this.x+1].minesNear === 0 && gridMines[this.y][this.x+1].mine === "detector") this.grass = false;
      if(gridMines[this.y-1][this.x-1].minesNear === 0 && gridMines[this.y-1][this.x-1].mine === "detector") this.grass = false;
      if(gridMines[this.y+1][this.x+1].minesNear === 0 && gridMines[this.y+1][this.x+1].mine === "detector") this.grass = false;
      if(gridMines[this.y+1][this.x-1].minesNear === 0 && gridMines[this.y+1][this.x-1].mine === "detector") this.grass = false;   
      if(gridMines[this.y-1][this.x+1].minesNear === 0 && gridMines[this.y-1][this.x+1].mine === "detector") this.grass = false;
    }
  }
}

//Snake
let mySnake;

let score = 3;
let snakeLength = score;
let xSpeed;
let changeDir = -1;
let fruits = [];
let snakes = [];
let crash = false;

function snake(){
  snakeGrid();
  showGridS();

  let head = snakes[0];

  //move body when alligned in grid
  if(crash === false){
    
    //move body when alligned in grid
    for(let i = snakes.length - 1; i > 0; i--){ 
      snakes[i].x = snakes[i - 1].x; 
      snakes[i].y = snakes[i - 1].y; 
    }
    head.move();
  }

  turn();
  
  for(let s of snakes){
    s.display();
  }
  addFruit();

  //display the score
  
  fill(255);
  text("Score:"+score, width/2, squareSize/2)
}

function addFruit(){
  for(let f of fruits){
    f.display();
  }
  for(let f of fruits){
    for(let s of snakes){
      let l = snakes.length;
      let backX = snakes[l-1].x
      let backY = snakes[l-1].y
      if(f.x * squareSize === s.x && f.y * squareSize === s.y){
        f.x = round(random(1,cols-2));
        f.y = round(random(1,rows-2));
        score++;
        print(score);
        if(changeDir === 1) { // down
          snakes.push(new Snake(backX, (backY+squareSize)));
        }
        if(changeDir === 2) {// up
          snakes.push(new Snake(backX, (backY-squareSize)));
        }
        if(changeDir === 3) { //right
          snakes.push(new Snake((backX-squareSize), backY));
        }
        if(changeDir === 4) {//left
          snakes.push(new Snake((backX+squareSize), backY));
        }
      }
    }
  }
}

function turn() {
  let head = snakes[0];

  if (head.x % squareSize === 0 && head.y % squareSize === 0) {
    //checks if its in a tile or in between
    if (changeDir === 3 && head.xSpeed === 0) { //right
      head.xSpeed = squareSize;
      head.ySpeed = 0;
    }
    if (changeDir === 4 && head.xSpeed === 0) { //left 
      head.xSpeed = -squareSize;
      head.ySpeed = 0;
            
    }
    if (changeDir === 1 && head.ySpeed === 0) { //down
      head.xSpeed = 0;
      head.ySpeed = squareSize;
            
    }
    if (changeDir === 2 && head.ySpeed === 0) { //up
      head.xSpeed = 0;
      head.ySpeed = -squareSize; 
            
    }
  }
}

function keyPressed() {
  for (let s of snakes){
    s.change();
  } 
}

function snakeGrid() {
  // creates the background grid
  for (let y = 0; y < rows; y++) {
    gridSnakes.push([]);
    for (let x = 0; x < cols; x++) {
      if(x < rows - 1 && x > 0 && y < cols - 1 && y > 0) { //creates grid inside the boarder
        if ((x + y) % 2 === 0) { //every second square
          gridSnakes[y].push("grassOne");
        }
        else {
          gridSnakes[y].push("grassTwo");
        }
      }
      else {
        gridSnakes[y].push("boarder");
      }
    }
  }
}

function showGridS() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) { 
      if(gridSnakes[y][x] === "grassOne") fill(199, 227, 113);
      else if(gridSnakes[y][x] === "grassTwo") fill(163, 199, 62)
      else fill(100);
      square(x * squareSize, y * squareSize, squareSize);
    }
  } 
}

class Snake {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.xSpeed = squareSize;
    this.ySpeed = 0;
    this.gridX = round(x/squareSize);
    this.gridY = round(y/squareSize);
  }
  display() {
    fill(62, 146, 199);
    square(this.x, this.y, squareSize);
  }
  move() {

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.gridX = round(this.x / squareSize);
    this.gridY = round(this.y / squareSize);

    if (this.x >= (cols-2)*squareSize) this.x = (cols-2)*squareSize;
    if (this.x < 1*squareSize) this.x = 1*squareSize;
    if (this.y >= (rows-2)*squareSize) this.y = (rows-2)*squareSize;
    if (this.y < 1*squareSize) this.y = 1*squareSize;

    for (let i = 1; i < snakes.length; i++) {   // start at 1 (skip head)
      if (snakes[i].x === snakes[0].x &&
          snakes[i].y === snakes[0].y) {
        this.xSpeed = 0;
        this.ySpeed = 0;
        crash = true;
        print("crash");
        
      }
    }
  }
  change(){
    if(keyCode === DOWN_ARROW) {
      changeDir = 1;
    }
    if (keyCode === UP_ARROW) {
      changeDir = 2;
    }
    if (keyCode === RIGHT_ARROW) {
      changeDir = 3;
    }
    if (keyCode === LEFT_ARROW) {
      changeDir = 4;
    }
  }

}
class Fruit {
  constructor() {
    this.x = round(random(1,cols-1));
    this.y = round(random(1,rows-1));
    // make sure that fruit doesnt spawn off the grid
    if (this.x >= cols - 2) this.x = cols - 2;
    else if (this.x < 1) this.x = 1;
    if (this.y > rows - 2) this.y = rows - 2;
    else if (this.y < 1) this.y = 1;

  }
  display() {
    fill(255, 0, 0);
    square(this.x * squareSize, this.y * squareSize, squareSize)
  }
}