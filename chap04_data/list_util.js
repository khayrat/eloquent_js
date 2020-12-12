let range_tests = [
  {
    start: 0,
    end: 5,
    expected: [0,1,2,3,4]
  },
  {
    start: 2,
    end: 8,
    expected: [2,3,4,5,6,7]
  },
  {
    start: 0,
    end: 10,
    steps: 2,
    expected: [0,2,4,6,8]
  },
  {
    start: 2,
    end: 10,
    steps: 2,
    expected: [2,4,6,8]
  },
  {
    start: 5,
    end: 2,
    steps: -1,
    expected: [5,4,3]
  },
];

for (let test of range_tests) {
  let start = test.start, end = test.end, steps = test.steps, expected = test.expected;
  console.log(`range(${start}, ${end}, ${steps}) = ${expected}: ${equals(expected, range(start, end, steps))}`);
}

function equals(a, b) {
  if (a == b) return true;
  if (typeof a != typeof b) return false;

  if (typeof a == 'object') {
    if (Array.isArray(a)) {
      if (!Array.isArray(b)) return false;
      if (a.length != b.length) return false;
    }
    for (let prop in a) {
      //console.log(prop);
      if (a[prop] != b[prop]) return false;
    }
    return true;
  }
  return a == b;
}

function range(start, end, steps = 1) {
  let list = [];

  if (steps < 0) {
    for (let s = start; s > end; s += steps) {
      list.push(s);
    }
  }
  else {
    for (let s = start; s < end; s += steps) {
      list.push(s);
    }
  }
//  console.log(list);
  return list;
}


/* ####################### */

let sum_tests = [
  {
    start: 0,
    end: 5,
    expected: 10,
    list: [0,1,2,3,4]
  },
  {
    start: 2,
    end: 8,
    expected: 27,
    list: [2,3,4,5,6,7]
  },
  {
    start: 0,
    end: 10,
    steps: 2,
    expected: 20,
    list: [0,2,4,6,8]
  },
  {
    start: 2,
    end: 10,
    steps: 2,
    expected: 20,
    list: [2,4,6,8]
  },
];

for (let test of sum_tests) {
  let start = test.start, end = test.end, steps = test.steps, expected = test.expected;
  console.log(`sum(range(${start}, ${end}, ${steps})) = ${expected}: ${equals(expected, sum(range(start, end, steps)))}`);
}

function sum(list) {
  let result = 0;
  for (let n of list) result += n;
  return result;
}
