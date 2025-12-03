// Snake Test
// Corbin Potter And Peyton Salzsauler
// December 3rd, 2025
//

let grid = []
let rows = 15;
let cols = 17;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  createGrid();
}

function createGrid(){
  for(let y= 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      square(x*squareSize,y*squareSize,squareSize);
      
      
    }
  }
}