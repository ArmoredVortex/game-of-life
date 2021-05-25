let sideLength = 30
let grid = [];
let newGrid = [];
function setup() {
  var canvas = createCanvas(500,500);
  canvas.parent('sketch-holder');
  background(0);
  createGrid()
}

function draw(){
	for(let x = 0;x < height;x++){
		for(let y = 0; y<width;y++){
			if (grid[x][y] == 1) {
				fill(255);
			} else {
				fill(0);
			}
			rect(x*(canvas.width/sideLength),y*(canvas.height/sideLength),canvas.width/sideLength,canvas.height/sideLength)
		}   
	}
	let x = 0
	let y = 0
	let sum = 0
  stroke(255)
  strokeWeight(5)
  rect(0,0,canvas.width/canvas.height)
	updateGrid();

}

function createGrid(){
	for(let x = 0;x < height;x++){
		grid[x] = [];
		newGrid[x] = [];
		for(let y = 0; y<width;y++){
			let randomval = Math.floor(Math.random()*15)
      if (randomval == 0) {
        grid[x][y] = 1
      } else {
        grid[x][y] = 0
      }
		}   
	}
}

function updateGrid(){
	for (let i = 0; i < sideLength; i++) {
    for (let j = 0; j < sideLength; j++) {
      let state = grid[i][j];
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        newGrid[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        newGrid[i][j] = 0;
      } else {
        newGrid[i][j] = state;
      }
    }
  }

  grid = newGrid;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + sideLength) % sideLength;
      let row = (y + j + sideLength) % sideLength;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}