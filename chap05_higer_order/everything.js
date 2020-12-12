function every(array, predicate) {
  for (let elem of array) {
    if (!predicate(elem)) return false;
  }
  return true;
}

function every_w_some(array, predicate) {
  return !array.some(e => !predicate(e));
}

const gt3 = n => n > 3;

console.log(`${every([4,5,6], gt3)}`);
console.log(`${every([4,5,3,6], gt3)}`);
console.log(`${every_w_some([4,5,6], gt3)}`);
console.log(`${every_w_some([4,5,3,6], gt3)}`);
