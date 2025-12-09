// Snake Test
// Corbin Potter And Peyton Salzsauler
// December 3rd, 2025
//
let mySnake;
let grid = []
let rows = 15;
let cols = 17;
let squareSize = 30;
let snakeLength = 1;
let xSpeed;
let changeDir = -1;
function setup() {
  createCanvas(cols * squareSize, rows * squareSize);

  //initialize the grid
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    // for(let x = 0; x < cols; x++){
    //   grid[y][x] = floor(random(0,2));
    // }
  }
  mySnake = new Snake(5, 0.2);
  myApple = new Fruit(1);
}

function draw() {
  noStroke();
  background(220);
  createGrid();
  mySnake.display();
  mySnake.move();
  myApple.display();
  turn();
}

function turn() {
  print(changeDir, mySnake.x, squareSize, mySnake.xSpeed, mySnake.ySpeed);
  if(changeDir !== -1){
    if (mySnake.x % squareSize === 0 && mySnake.y % squareSize === 0) {
      //checks if its in a tile or in between
      if (changeDir === 3) { //right
        mySnake.xSpeed = 2;
        mySnake.ySpeed = 0;
      }
      if (changeDir === 4) { //left 
        mySnake.xSpeed = -2;
        mySnake.ySpeed = 0;
       
      }
      if (changeDir === 1) { //down
        mySnake.xSpeed = 0;
        mySnake.ySpeed = 2;
       
      }
      if (changeDir === 2) { //up
        mySnake.xSpeed = 0;
        mySnake.ySpeed = -2; 
       
      }
    }

  }

}

function keyPressed() {
    mySnake.change();
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
  constructor(c, s) {
    this.x = 4*squareSize; this.y =  7*squareSize;
    this.c = c; this.s = s;;
    this.xSpeed = 2;
    this.ySpeed = 0;
  }
  display() {
    fill(62, 146, 199);
    rect(this.x , this.y , squareSize * -snakeLength, squareSize);
  }
  move() {

    this.x += round(this.xSpeed);
    this.y += round(this.ySpeed);

    if (this.x >= cols*squareSize) this.x = 17*squareSize;
    if (this.x < 1*squareSize) this.x = 1*squareSize;
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
}
class Fruit {
  constructor(count) {
    this.x = round(random(cols));
    this.y = round(random(rows));
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