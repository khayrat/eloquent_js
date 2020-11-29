class PGroup {
  constructor() {
    this.array = [];
  }

  add(elem) {
    if (this.array.includes(elem)) return this;
    else {
      let pg = new PGroup();
      pg.array = this.array.concat(elem);
      return pg;
    }
  }

  has(elem) {
    return this.array.includes(elem);
  }

  delete(elem) {
    if (!this.array.includes(elem)) return this;
    else {
      let pg = new PGroup();
      pg.array = this.array.filter(e => e != elem);
      return pg;
    }
  }
}

PGroup.empty = new PGroup();

let pg = PGroup.empty;
console.log(pg);

pg = PGroup.empty.add(1).add(1).add(2);

console.log(pg);
console.log(pg.has(1));
console.log(pg.has(2));
console.log(pg.has(3));

console.log(pg);
pg = pg.delete(0).delete(1).add(3);
console.log(pg.has(1));
console.log(pg.has(2));
console.log(pg.has(3));
console.log(pg);

p1 = PGroup.empty;
p2 = PGroup.empty;
console.log(p1 == p2);
