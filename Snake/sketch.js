// Snake Test
// Corbin Potter And Peyton Salzsauler
// December 3rd, 2025
//

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
  mySnake = new Snake(4*squareSize, 7*squareSize, 5, 0.2);
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
  if (changeDir !== -1) {
    if (mySnake.x % squareSize === 0) {
      if (changeDir === 3) {
        mySnake.xSpeed = 0.2;
        mySnake.ySpeed = 0;
        changeDir = -1;
      }
      if (changeDir === 4) {
        mySnake.xSpeed = -0.2;
        mySnake.ySpeed = 0;
        changeDir = -1;
      }
    }
    if (mySnake.y % squareSize === 0) {
      if (changeDir === 1) {
        mySnake.xSpeed = 0;
        mySnake.ySpeed = 0.2;
        changeDir = -1;
      }
      if (changeDir === 2) {
        mySnake.xSpeed = 0;
        mySnake.ySpeed = -0.2;
        changeDir = -1;
      }
    }
    
  }

}

function keyPressed() {

  if (keyCode === DOWN_ARROW) {
    // mySnake.xSpeed = 0;
    // mySnake.ySpeed = 0.2;
    changeDir = 1;
  }
  if (keyCode === UP_ARROW) {
    // mySnake.xSpeed = 0;
    // mySnake.ySpeed = -0.2;
    changeDir = 2;
  }
  if (keyCode === RIGHT_ARROW) {
    // mySnake.xSpeed = 0.2;
    // mySnake.ySpeed = 0;
    changeDir = 3;
  }
  if (keyCode === LEFT_ARROW) {
    // mySnake.xSpeed = -0.2;
    // mySnake.ySpeed = 0;
    changeDir = 4;
  }
}
function createGrid() {
  // creates the background grid
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x] = 0;

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
  constructor(x, y, c, s) {
    this.x = x; this.y = y;
    this.c = c; this.s = s;;
    this.xSpeed = 0.2;
    this.ySpeed = 0;
  }
  display() {
    fill(62, 146, 199);
    rect(this.x , this.y , squareSize * -snakeLength, squareSize);
  }
  move() {

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x >= cols) this.x = 17;
    if (this.x < 1) this.x = 1;
    if (this.y >= 14) this.y = 14;
    if (this.y < 0) this.y = 0;
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