// Snake Test
// Corbin Potter And Peyton Salzsauler
// December 3rd, 2025
//

let grid = []
let rows = 15;
let cols = 17;
let squareSize = 30;
let snakeLength = 3;
let xSpeed;
function setup() {
  createCanvas(cols*squareSize, rows*squareSize);

  //initialize the grid
    for(let y = 0; y < rows; y++){
      grid[y] = [];
      for(let x = 0; x < cols; x++){
        grid[y][x] = floor(random(0,2));
      }
  }
  mySnake = new Snake(4,7,5,0.2);
  myApple = new Fruit(1);
}

function draw() {
  noStroke();
  background(220);
  createGrid();
  mySnake.display();
  mySnake.move();
  myApple.display();
}

function createGrid(){
  // creates the background grid
  for(let y= 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      grid[y][x] = 0;
      
      if((x+y)%2 === 0){
        fill(199, 227, 113);
      }
      else{
        fill(163, 199, 62);
      }
      square(x*squareSize,y*squareSize,squareSize);
    }
  }
}
class Snake{
  constructor(x,y,c,s){
    this.x = x; this.y = y;
    this.c = c; this.s = s;
  }
  display(){
    fill(62, 146, 199);
    rect(this.x*squareSize,this.y*squareSize,squareSize*-snakeLength, squareSize);
  }
  move(){
    xSpeed = this.s;
    this.x += xSpeed;
  }
}
class Fruit{
  constructor(count){
    this.x = round(random(cols));
    this.y = round(random(rows));
    this.count = count;
    if(this.x >= cols) this.x = 16;
    else if(this.x < 1) this.x = 1;
    if(this.y >= rows) this.y = 14;
    else if(this.y < 1) this.y = 1;
  }
  display(){
    fill(255, 0, 0);
    square(this.x*squareSize, this.y*squareSize, squareSize)
  }
}