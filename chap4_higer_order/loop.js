function repeat(n, action) {
  for (let i = 0; i < n; i++) action(i);
}

let labels = [];
repeat(5, i => labels.push(`Unit ${i + 1}`));

console.log(labels);

function loop(value, test, update, body) {
  while(true) {
    if (!test(value)) return;
    body(value);
    value = update(value);
  }
}

let items = [];
loop(0, i => i < 10, i => i + 1, i => items.push(`item ${i + 1}`));
console.log(items);
