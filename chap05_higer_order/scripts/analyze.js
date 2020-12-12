require('./scripts');

function filter(array, test) {
  let passed = [];
  for (let elem of array) {
    if (test(elem)) passed.push(elem);
  }
  return passed;
}

function map(array, transform) {
  let mapped = [];
  for (let elem of array) mapped.push(transform(elem));
  return mapped;
}

function reduce(array, combine, start) {
  let current = start;
  for (let elem of array) current = combine(current, elem);
  return current;
}

console.log(filter(SCRIPTS, s => s.living));
console.log(filter(SCRIPTS, s => s.living).length);

let rtlScripts = filter(SCRIPTS, script => script.direction === "rtl");
console.log(map(rtlScripts, s => s.name));

console.log(reduce([1,2,3,4], (a,b) => a + b, 0))

function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => count + (to - from), 0);
}

console.log(SCRIPTS.reduce((a,b) => characterCount(a) < characterCount(b) ? b : a));

function average(array) {
  return array.reduce((a,b) => a + b) / array.length;
}

console.log(Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year))));
console.log(Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year))));

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(121));

// two emoji characters, horse and shoe
let horseShoe = "🐴👟";
console.log(horseShoe);
console.log(horseShoe.length);

// invalid half-char
console.log(horseShoe[0]);
// code of half char
console.log(horseShoe.charCodeAt(0));
// actual code for horse emoji
console.log(horseShoe.codePointAt(0));

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    }
    else {
      counts[known].count++;
    }
  }
  return counts;
}

console.log(countBy([1,2,3,4,5], n => n > 2));

function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({name}) => name != "none");

  let total = scripts.reduce((n, {count}) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts.map(({name, count}) => {
   return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", ");
}

let text = '英国的狗说"woof", 俄罗斯的狗说"тяв"';
console.log(text);
console.log(textScripts(text));

console.log("-".repeat(50));
console.log("dominantWritingDirection...");

function dominantWritingDirection(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({name}) => name != "none");
  return scripts.reduce((s, other) => s.count > other.count ? s : other).name;
}

console.log(`${text}: ${dominantWritingDirection(text)}`);
let text2 = 'فففففففففففففففففففففففففففففففففففففففففففففففففففففففففف英国的狗说"woof", 俄罗斯的狗说"тяв"';
console.log(`${text2}: ${dominantWritingDirection(text2)}`);

let text3 = 'ᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬᠬ英国的狗说"woof", 俄罗斯的狗说"тяв"ففففففففففففففففففففففففᠬᠬᠬᠬᠬ';
console.log(`${text3}: ${dominantWritingDirection(text3)}`);
