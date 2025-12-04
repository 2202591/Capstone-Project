// Snake Test
// Corbin Potter And Peyton Salzsauler
// December 3rd, 2025
//

let grid = []
let rows = 15;
let cols = 17;
let squareSize = 30;
let snakeLength = 30;
function setup() {
  createCanvas(cols*squareSize, rows*squareSize);

  //initialize the grid
    for(let y = 0; y < rows; y++){
      grid[y] = [];
      for(let x = 0; x < cols; x++){
        grid[y][x] = floor(random(0,2));
      }
  }
  mySnake = new Snake(3,7);
}

function draw() {
  noStroke();
  background(220);
  createGrid();
  mySnake.display();
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
  constructor(x,y,c){
    this.x = x; this.y = y;
    this.c = c;
  }
  display(){
    fill(62, 146, 199);
    square(this.x*squareSize,this.y*squareSize, squareSize);
  }
  move(){

  }
}