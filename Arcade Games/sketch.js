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
}

function draw() {
  background(220);
  x = getCurrentX();
  y = getCurrentY();
}

// Start Screen
function start() {
  
}

// Minesweeper

function getCurrentX() { 
  let constrainedX = constrain(mouseX, 0, width-1);
  return floor(constrainedX / squareSize);
}

function getCurrentY() {  
  let constrainedY = constrain(mouseY, 0, height-1);
  return floor(constrainedY / squareSize);
}

function detectMines(y,x){
  if(grid[y][x] === 0){
    return true;
  }
  else{
    return false;
  }
}


class Mines {
  constructor(x,y,count) {
    this.x = x;
    this.y = y;
  }
  checkIfMine(){
    for(let y = 0; y < rows; y++){
      for(let x = 0; x < cols; x++){
        
        if(detectMines === true){
          
        }
        else{
          
        }
      }
    }
  }
}

class Detectors {
  constructor(x,y,count) {
    this.x = x;
    this.y = y;
    this.count = count;
    this.minesNear = 0;
    this.color = color(238,230,199)
  }

  display() {
    this.nearMines();
    fill(color);
    square(this.x*squareSize, this.y*squareSize, squareSize);
    fill(0);
    textSize(20);
    text(this.minesNear,this.x*squareSize, this.y*squareSize)
  }

  nearMines() {
    for(let y = 0; y < rows; y++){
      for(let x = 0; x < cols; x++){
        if(detectMines(y+1,x)) this.minesNear++;
        if(detectMines(y-1,x)) this.minesNear++;
        if(detectMines(y+1,x+1)) this.minesNear++;
        if(detectMines(y-1,x+1))this. minesNear++;
        if(detectMines(y,x+1)) this.minesNear++;
        if(detectMines(y,x-1)) this.minesNear++;
        if(detectMines(y-1,x-1)) this.minesNear++;
        if(detectMines(y+1,x-1)) this.minesNear++;
      }
    }
  }
}

//Snake