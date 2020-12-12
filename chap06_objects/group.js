class Group {
  constructor() {
    this.content = [];
  }

  static from(iterable) {
    let group = new Group();

    for (let elem of iterable) {
      group.add(elem);
    }

    return group;
  }

  add(elem) {
    if (!this.content.includes(elem)) {
      this.content.push(elem);
    }
  }

  delete(elem) {
    if (this.content.includes(elem)) {
      this.content = this.content.filter(e => e != elem);
    }
  }

  has(elem) {
    return this.content.includes(elem);
  }

  [Symbol.iterator]() { return new GroupIterator(this); }
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.index = 0;
  }

  next() {
    if (this.index == this.group.content.length) return { done: true };

    let value = this.group.content[this.index];
    this.index += 1;
    return { value, done: false };
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false


for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
