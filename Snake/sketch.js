// Snake Test
// Corbin Potter And Peyton Salzsauler
// December 3rd, 2025
//
let mySnake;
let grid = []
let rows = 15;
let cols = 17;
let squareSize = 30;
let score = 3;
let snakeLength = score;
let xSpeed;
let changeDir = -1;
let fruits = [];
let snakes = [];
let crash = false;





function setup() {
  frameRate(8)
  createCanvas(cols * squareSize, rows * squareSize);
  //initialize the grid
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    // for(let x = 0; x < cols; x++){
    //   grid[y][x] = floor(random(0,2));
    // }
  }
  snakes.push(new Snake(4*squareSize, 7*squareSize));
  snakes.push(new Snake(3*squareSize, 7*squareSize));
  snakes.push(new Snake(2*squareSize, 7*squareSize));
  fruits.push(new Fruit(1));
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
        f.x = round(random(cols-1))
        f.y = round(random(rows-1))
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
  


function draw() {
  noStroke();
  background(220);
  createGrid();

  let head = snakes[0];
  turn();
  //move head
  if(crash === false){
    
    //move body when alligned in grid
    for(let i = snakes.length - 1; i > 0; i--){ 
      snakes[i].x = snakes[i - 1].x; 
      snakes[i].y = snakes[i - 1].y; 
    }
    head.move();
  }
  
  
  for(let s of snakes){
    s.display();
  }
  addFruit();

  //display the score
  
  fill(0);
  textSize(30);
  text("Score:"+score, 0, squareSize)
}
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
function createGrid() {
  // creates the background grid
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
  

      if ((x + y) % 2 === 0) { //every second square
        fill(199, 227, 113);
      }
      else {
        fill(163, 199, 62);
      }
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
    rect(this.x, this.y, squareSize, squareSize);
  }
  move() {
    let l = snakes.length;
    
    let backX = snakes[l-1].x
    let backY = snakes[l-1].y
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.gridX = round(this.x / squareSize);
    this.gridY = round(this.y / squareSize);

    if (this.x >= 16*squareSize) this.x = 16*squareSize;
    if (this.x < 0*squareSize) this.x = 0*squareSize;
    if (this.y >= 14*squareSize) this.y = 14*squareSize;
    if (this.y < 0) this.y = 0;

    //check if snake runs into itself
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