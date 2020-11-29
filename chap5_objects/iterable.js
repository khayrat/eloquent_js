console.log("-".repeat(50));
console.log("OK-Iterator");
console.log("-".repeat(50));

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next());

console.log("-".repeat(50));
console.log("Matrix-Iterator");
console.log("-".repeat(50));

class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width   = width;
    this.height  = height;
    this.content = [];

    for (let y = 0; y < height; y++) { 
      for (let x = 0; x < width; x++) { 
        this.content[y * width + x] = element(x,y);
      }
    }
  }

  get(x, y) { return this.content[y * this.width + x]; }

  set(x, y, value) { this.content[y * this.width + x] = value; }

  [Symbol.iterator]() { return new MatrixIterator(this); }
}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return { done: true };

    let x = this.x, y = this.y;
    let value = this.matrix.get(x, y);

    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }

    return { 
      value: {x, y, value}, 
      done: false
    };
  }
}

let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`);
for (let {x, y, value} of matrix) {
  console.log(x, y, value);
}
