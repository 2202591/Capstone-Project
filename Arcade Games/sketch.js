// Snake, Minesweeper, and block breaker
// Corbin and Peyton
// December 1st, 2025
// CS30 Capstone Project
// Mr. Scott

let grid = [];

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
  textSize(20);
  createCanvas(cols*squareSize, rows*squareSize);
  snakeGrid();
}

function draw() {
  background(220);
  x = getCurrentX();
  y = getCurrentY();
  start();
  if(game === 1) mineSweeper();
  if(game === 2) snake();
}

// Start Screen
function start() {
  fill(0); 
  square(width*0.33-50, height/2-50, 100);
  square(width*0.66-50, height/2-50, 100);

  if(mouseX > width*0.33-50 && mouseX < width*0.33+50) {
    if(mouseY > height/2-50 && mouseY < height/2+50) {
      if(mouseIsPressed) {
        game = 1;
      }
    }
  }
  if(mouseX > width*0.66-50 && mouseX < width*0.66+50) {
    if(mouseY > height/2-50 && mouseY < height/2+50) {
      if(mouseIsPressed) {
        game = 2;
      }
    }
  }
}

// Minesweeper
function mineSweeper() {
  showGrid();
  checkGrid();
}

function mineGrid() {  //randomizes grid start
  for (let y = 0; y < rows; y++) {
    grid.push([]);
    for (let x = 0; x < cols; x++) {
      let num = random(1);
      if(x < rows - 1 && x > 0 && y < cols - 1 && y > 0) { //creates grid inside the boarder
        if(num < 0.165) { // frequency of mine placement
          grid[y].push(new DetectorOrMine(x,y,"mine")); //places mine
        }
        else grid[y].push(new DetectorOrMine(x,y,"detector")); //places detector
      }
      else {
        grid[y].push(new DetectorOrMine(x,y,"boarder")); // places bparder
      }
      
    }
  } 
  for (let y = 0; y < rows; y++) { //checks every square to see how many mines are near
    for (let x = 0; x < cols; x++) { 
      if(y > 0 && y < rows-1 && x < cols-1 && x > 0) grid[y][x].nearMines();
    }
  }
  for (let y = 0; y < rows; y++) { //reveals all numbers that are beside squares with no mines near
    for (let x = 0; x < cols; x++) { 
      if(y > 0 && y < rows-1 && x < cols-1 && x > 0) grid[y][x].noMines();
    }
  }

}

function showGrid() { //displays the grid
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) { 
      grid[y][x].display();
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
      if(grid[y][x].grass === false && grid[y][x].mine !== "mine") {
        count++;  //counts how mamy squares have been clicked
      }
      if(grid[y][x].mine === "mine") {
        mineCount++;  //counts # of mines
      }
      if(grid[y][x].mine === "mine" && grid[y][x].grass === false){
        activeMine = 1;  //checks if a mines has been clicked
      }
      if(grid[y][x].flag){
        flagCount++;  //counts # of flags active
      }
    }
  }
  if((rows)*(cols) - mineCount === count && activeMine === 0) {
    youWin();
  }
  if(activeMine === 1) {
    youLose();
  }
  fill(255);
  text(mineCount-flagCount,width/2,squareSize/2); //prints how many mines are left
}

function youWin() {
  fill(255);
  background(0);
  text("YOU WIN",width/2, height/2);
}

function youLose() {
  fill(255);
  background(0);
  text("YOU LOSE",width/2, height/2);
}

function mousePressed() {
  if(game === 1) {
    if (mouseX <= width & mouseY <= height) { //mouse must be in the canvas
      if (grid[y][x].grass){
        if(keyIsDown(17)) { //if ctrl is downn places flags if number of flags > 0
          if(grid[y][x].flag === false){
            if(mineCount - flagCount > 0) grid[y][x].flag = true;
          }
          else {
            grid[y][x].flag = false;  //removes flag if there is a flag already there
          }
        }
        else {
          if(grid[y][x].flag === false) { //allows to turnoer new squares if there is no flag
            grid[y][x].grass = false;
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
    this.colorOne = color(199, 227, 113);   //background colors
    this.colorTwo = color(163, 199, 62);
    this.boarderColor = color(100); //boarder color

    this.flag = false;  //each square starts out as not showing and no flag
    this.grass = true;
    this.mine = mine;
    this.minesNear = 0;
  }

  display() {
    if(this.mine === "boarder") this.grass = false; //shows boarder instantly
    if(this.grass === false || this.minesNear === 0) {  //displays grass squares before being turned over
      if (this.mine === "mine") {
        this.minesNear = -1;
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

        fill(0);
        textSize(20);  //puts text only on squares with mines near
        if(this.minesNear !== 0) text(this.minesNear,(this.x + 0.5)*squareSize, (this.y + 0.5)*squareSize);
      }
      else { //boarder
        fill(this.boarderColor);
        square(this.x*squareSize, this.y*squareSize, squareSize);
      }
    }
    else{
      if(this.flag) {  //makes a flag
        if((this.x+this.y)%2 === 0) fill(199,227,113);
        else fill(163,199,62);
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
        if((this.x+this.y)%2 === 0) fill(199,227,113); //still keeps the checkerboard pattern
        else fill(163,199,62);
        if(this.mine === "boarder") fill(this.boarderColor);
        square(this.x*squareSize, this.y*squareSize, squareSize);
      }
    }
  }

  nearMines() { //checks how many mines are near each square in a one tile radius
    if(grid[this.y-1][this.x].mine === "mine") this.minesNear++;
    if(grid[this.y+1][this.x].mine === "mine") this.minesNear++;
    if(grid[this.y][this.x-1].mine === "mine") this.minesNear++;
    if(grid[this.y][this.x+1].mine === "mine") this.minesNear++;
    if(grid[this.y-1][this.x-1].mine === "mine") this.minesNear++;
    if(grid[this.y+1][this.x+1].mine === "mine") this.minesNear++;
    if(grid[this.y+1][this.x-1].mine === "mine") this.minesNear++;   
    if(grid[this.y-1][this.x+1].mine === "mine") this.minesNear++;
  }

  noMines() {
    if(this.mine !== "mine") {  //displays all squares that are next to squares with no mines
      if(grid[this.y-1][this.x].minesNear === 0 && grid[this.y-1][this.x].mine === "detector") this.grass = false;
      if(grid[this.y+1][this.x].minesNear === 0 && grid[this.y+1][this.x].mine === "detector") this.grass = false;
      if(grid[this.y][this.x-1].minesNear === 0 && grid[this.y][this.x-1].mine === "detector") this.grass = false;
      if(grid[this.y][this.x+1].minesNear === 0 && grid[this.y][this.x+1].mine === "detector") this.grass = false;
      if(grid[this.y-1][this.x-1].minesNear === 0 && grid[this.y-1][this.x-1].mine === "detector") this.grass = false;
      if(grid[this.y+1][this.x+1].minesNear === 0 && grid[this.y+1][this.x+1].mine === "detector") this.grass = false;
      if(grid[this.y+1][this.x-1].minesNear === 0 && grid[this.y+1][this.x-1].mine === "detector") this.grass = false;   
      if(grid[this.y-1][this.x+1].minesNear === 0 && grid[this.y-1][this.x+1].mine === "detector") this.grass = false;
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


// function setup() {
//   frameRate(8)
//   snakes.push(new Snake(4*squareSize, 7*squareSize));
//   snakes.push(new Snake(3*squareSize, 7*squareSize));
//   snakes.push(new Snake(2*squareSize, 7*squareSize));
//   fruits.push(new Fruit(1));
// }

function snake(){
  
}

function addFruit(){
  for(let f of fruits){
    f.display();
  }
  growSnake();
  for(let f of fruits){
    for(let s of snakes){
      if(f.x * squareSize === s.x && f.y * squareSize === s.y){
        f.x = round(random(cols-1))
        f.y = round(random(rows-1))
        score++;
        print(score);
      }
    }
  }
}
  


// function draw() {
//   noStroke();
//   background(220);
//   createGrid();
  

//   let head = snakes[0];

//   //move body when alligned in grid
//   for(let i = snakes.length - 1; i > 0; i--){ 
//     snakes[i].x = snakes[i - 1].x; 
//     snakes[i].y = snakes[i - 1].y; 
//   }

//   turn();
//   //move head
//   head.move();
  
//   for(let s of snakes){
//     s.display();
    
    
//   }
//   addFruit();

//   //display the score
  
//   fill(0);
//   textSize(30);
//   text("Score:"+score, 0, squareSize)
// }

function growSnake(){
  let l = snakes.length;
  let backX = snakes[l-1].x
  let backY = snakes[l-1].y
  for(let f of fruits){
    for(let s of snakes) {
      if(f.x * squareSize === s.x && f.y * squareSize === s.y){
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

// function snakeGrid() {
//   // creates the background grid
//   for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//       if(x < rows - 1 && x > 0 && y < cols - 1 && y > 0) { //creates grid inside the boarder
//         if ((x + y) % 2 === 0) { //every second square
//           fill(199, 227, 113);
//         }
//         else {
//           fill(163, 199, 62);
//         }
//       }
//       else {
//         fill(100);
//       }
//       square(x * squareSize, y * squareSize, squareSize);
//     }
//   }
// }

// function snakeGrid() {  //randomizes grid start
//   for (let y = 0; y < rows; y++) {
//     grid.push([]);
//     for (let x = 0; x < cols; x++) {
//       if(x < rows - 1 && x > 0 && y < cols - 1 && y > 0) { //creates grid inside the boarder
//         if ((x + y) % 2 === 0) { //every second square
//           fill(199, 227, 113);
//         }
//         else {
//           fill(163, 199, 62);
//         }
//       }
//       else {
//         fill(100);
//       }
//     }
//   } 
// }

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
    rect(this.x, this.y, squareSize, squareSize);
  }
  move() {

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.gridX = round(this.x / squareSize);
    this.gridY = round(this.y / squareSize);

    if (this.x >= 16*squareSize) this.x = 16*squareSize;
    if (this.x < 0*squareSize) this.x = 0*squareSize;
    if (this.y >= 14*squareSize) this.y = 14*squareSize;
    if (this.y < 0) this.y = 0;
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

  // .
}
class Fruit {
  constructor(count) {
    this.x = round(random(cols-1));
    this.y = round(random(rows -1));
    this.count = count;
    // make sure that fruit doesnt spawn off the grid
    if (this.x >= cols) this.x = 16;
    else if (this.x < 1) this.x = 1;
    if (this.y > rows) this.y = 14;
    else if (this.y < 1) this.y = 1;

  }
  display() {
    fill(255, 0, 0);
    square(this.x * squareSize, this.y * squareSize, squareSize)
  }
}