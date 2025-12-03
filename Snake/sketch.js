// Snake Test
// Corbin Potter And Peyton Salzsauler
// December 3rd, 2025
//

let grid = []
let rows = 15;
let cols = 17;
let squareSize = 20;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  createGrid();
}

function createGrid(){
  // creates the background grid
  for(let y= 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      square(x*squareSize,y*squareSize,squareSize);
      if(grid[y][x] === 201){
        fill(0,201,0);
      }
      else{
        fill(0,220,0);
      }
      
    }
  }
}
function gridColors(){
  //places colors of grid in every square
  for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      grid[y][x] = floor(random(201,220));
    }
  }
}