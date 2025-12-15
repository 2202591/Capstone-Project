// Snake, Minesweeper, and Pac Man
// Corbin and Peyton
// December 1st, 2025
// CS30 Capstone Project
// Mr. Scott

let grid = [];

let squareSize = 30;
let rows =  30;
let cols = 30;
let x;
let y;
let mineNum = 50;

function setup() {
  rows+=2;
  cols+=2;
  createCanvas(cols*squareSize, rows*squareSize);
  randomGrid();
  checkGrid();
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
  let mineNum = 50;
  for (let y = 0; y < rows; y++) {
    grid.push([]);
    for (let x = 0; x < cols; x++) {
      let num = random(1);
      if(x < rows - 1 && x > 0 && y < cols - 1 && y > 0) {
        if(num < 0.165 && mineNum > 0) {
          grid[y].push(new DetectorOrMine(x,y,"mine"));
          // mineNum--;
        }
        else grid[y].push(new DetectorOrMine(x,y,"detector"));
      }
      else {
        grid[y].push(new DetectorOrMine(x,y,"boarder"));
      }
      
    }
  } 
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) { 
      if(y > 0 && y < rows-1 && x < cols-1 && x > 0) grid[y][x].nearMines();
    }
  }

}

function showGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) { 
      grid[y][x].display();
    }
  } 
}

function checkGrid() {
  let count = 0;
  let mineCount = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) { 
      if(grid[y][x].grass === false && grid[y][x].mine === "detector") {
        count++;
      }
      if(grid[y][x].mine === "mine") {
        mineCount++;
      }
    }
  }
  print(mineCount);
}

function mousePressed() {
  if (mouseX <= width & mouseY <= height) {
    if (grid[y][x].grass){
      if(keyIsDown(17)) {
        if(grid[y][x].flag === false){
          grid[y][x].flag = true;
        }

        else {
          grid[y][x].flag = false;
        }
      }
      else {
        if(grid[y][x].flag === false) {
          grid[y][x].grass = false;
        }
        if(grid[y][x].mine === "mine") {

        }
      }
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

class DetectorOrMine {
  constructor(x,y,mine) {
    this.x = x;
    this.y = y;

    this.mineColor = color(230, 59, 87);
    this.colorOne = color(238,230,199);
    this.colorTwo = color(215,207,174);
    this.boarderColor = color(100);

    this.flag = false;
    this.grass = true;
    this.mine = mine;
    this.minesNear = 0;
  }

  display() {
    //add grass plus click
    noStroke();
    if(this.grass === false || this.minesNear === 0) {
      if (this.mine === "mine") {
        this.minesNear = -1;
        if((this.x+this.y)%2 === 0) fill(this.colorOne);
        else fill(this.colorTwo);
        square(this.x*squareSize, this.y*squareSize, squareSize);

        fill(this.mineColor);
        circle((this.x + 0.5)*squareSize, (this.y + 0.5)*squareSize, squareSize/2);
      }
      else if(this.mine === "detector"){
        if((this.x+this.y)%2 === 0) fill(this.colorOne);
        else fill(this.colorTwo);
        square(this.x*squareSize, this.y*squareSize, squareSize);

        fill(0);
        textSize(20);
        if(this.minesNear !== 0) text(this.minesNear,(this.x + 0.35)*squareSize, (this.y + 0.75)*squareSize);
      }
      else {
        fill(this.boarderColor);
        square(this.x*squareSize, this.y*squareSize, squareSize);
      }
    }
    else{
      if(this.flag) {
        if((this.x+this.y)%2 === 0) fill(199,227,113);
        else fill(163,199,62);
        if(this.mine === "boarder") fill(this.boarderColor);
        square(this.x*squareSize, this.y*squareSize, squareSize);
        
        if(this.mine !== "boarder") {
          fill(255,0,0);
          triangle(this.x*squareSize + 13, this.y*squareSize + 5, this.x*squareSize + 22, this.y*squareSize + 10, this.x*squareSize + 13, this.y*squareSize + 15);
          rectMode(CORNERS);
          rect(this.x*squareSize + 13, this.y*squareSize + 5, this.x*squareSize + 11, this.y*squareSize + 25);
          rectMode(CORNER);
        }
     }
      else {
        if((this.x+this.y)%2 === 0) fill(199,227,113);
        else fill(163,199,62);
        if(this.mine === "boarder") fill(this.boarderColor);
        square(this.x*squareSize, this.y*squareSize, squareSize);
      }
    }
  }

  nearMines() {
    if(grid[this.y-1][this.x].mine === "mine") this.minesNear++;
    if(grid[this.y+1][this.x].mine === "mine") this.minesNear++;
    if(grid[this.y][this.x-1].mine === "mine") this.minesNear++;
    if(grid[this.y][this.x+1].mine === "mine") this.minesNear++;
    if(grid[this.y-1][this.x-1].mine === "mine") this.minesNear++;
    if(grid[this.y+1][this.x+1].mine === "mine") this.minesNear++;
    if(grid[this.y+1][this.x-1].mine === "mine") this.minesNear++;   
    if(grid[this.y-1][this.x+1].mine === "mine") this.minesNear++;
  }

}

//Snake