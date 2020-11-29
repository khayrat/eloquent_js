let size = 9;
let grid = "";

for (let i=0; i<size; i++) {
  for (let j=i; j<i+size; j++) {
    if (j % 2 == 0) {
      grid += " ";
    }
    else {
      grid += "#";
    }
  }
  grid += '\n';
}
console.log(grid);
