// Snake, Minesweeper, and Pac Man
// Corbin and Peyton
// December 1st, 2025
// CS30 Capstone Project
// Mr. Scott

let grid = [[]];

let squareSize = 30;
let rows =  10;
let cols = 10;
let x;
let y;

function setup() {
  createCanvas(cols*squareSize, rows*squareSize);
  randomGrid();
}

function draw() {
  background(220);
  x = getCurrentX();
  y = getCurrentY();
  showGrid();
}

// Start Screen
function start() {
  
}

// Minesweeper
function randomGrid() {  //randomizes grid start
  for (let y = 0; y < rows; y++) {
    grid.push([]);
    for (let x = 0; x < cols; x++) { 
      grid[y].push(new Detector(x,y,3));
    }
  } 
  grid.pop();
}

function showGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) { 
      grid[y][x].display();
    }
  } 
}

function getCurrentX() { 
  let constrainedX = constrain(mouseX, 0, width-1);
  return floor(constrainedX / squareSize);
}

function getCurrentY() {  
  let constrainedY = constrain(mouseY, 0, height-1);
  return floor(constrainedY / squareSize);
}

function detectMines(x,y){
  if(grid[y][x] === Mine){
    return true;
  }
  else{
    return false;
  }
}


class Mine {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.colorOne = color(238,230,199);
    this.colorTwo = color(230, 59, 87);
  }

  display() {
    fill(this.colorOne);
    square(this.x*squareSize, this.y*squareSize, squareSize);
    fill(this.colorTwo);
    circle((this.x + 0.5)*squareSize, (this.y + 0.5)*squareSize, squareSize/2);
  }

}

class DetectorOrMine {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.minesNear = 0;

    this.colorOne = color(238,230,199);
    this.colorTwo = color(230, 59, 87);
    this.colorDetector = color(238,230,199)

    this.num = random(1);
    if(this.num < 0.15) this.mine = true;
    else this.mine = false;
  }

  display() {
    if (this.mine) {
      fill(this.colorOne);
      square(this.x*squareSize, this.y*squareSize, squareSize);
      fill(this.colorTwo);
      circle((this.x + 0.5)*squareSize, (this.y + 0.5)*squareSize, squareSize/2);
    }
    else {
      this.nearMines();
      fill(this.colorDetector);
      square(this.x*squareSize, this.y*squareSize, squareSize);
      fill(0);
      textSize(20);
      text(this.minesNear,(this.x + 0.35)*squareSize, (this.y + 0.75)*squareSize)
   
    }
  }

  nearMines() {
    for(let y = 0; y < rows; y++){
      for(let x = 0; x < cols; x++){
        // if(detectMines(x+1,y)) this.minesNear++;
        // if(detectMines(x-1,y)) this.minesNear++;
        // if(detectMines(x+1,y+1)) this.minesNear++;
        // if(detectMines(x-1,y+1))this. minesNear++;
        // if(detectMines(x,y+1)) this.minesNear++;
        // if(detectMines(x,y-1)) this.minesNear++;
        // if(detectMines(x-1,y-1)) this.minesNear++;
        // if(detectMines(x+1,y-1)) this.minesNear++;
      }
    }
  }
}

//Snake