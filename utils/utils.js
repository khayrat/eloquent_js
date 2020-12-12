function test(label, body) {
  try {
    if (!body()) console.log(`${label} failed!`);
  }
  catch (e) {
    console.log(`${label} failed with exception: "${e.message}"`);
  }
}

function itest(label, body) { }

function sum(array) {
  return array.reduce((a,b) => a+b);
}

function range(from, to, step = 1) {
  let array = [];
  for (let i = from; i < to; i += step) {
    array.push(i);
  }
  return array;
}

function equals(a, b) {
//  console.log(`typeof ${a}: ${typeof a}`);
  if (a === b) return true;
  if (typeof a != typeof b) return false;
  if (typeof a != "object") return false;
  
  let a_props = Object.keys(a), b_props = Object.keys(b);

  if (a_props.length != b_props.length) return false;

  for (let prop of a_props) {
    let a_v = a[prop], b_v = b[prop];
    if (typeof a_v == "object") {
      if (!equals(a_v, b_v)) return false;
    }
    else {
      if (a_v !== b_v) return false;
    }
  }
  return true;
} 

///// tests //////

test("sum", () => {
 return 6 == sum([1,2,3]); 
});

test("range", () => {
  let expected = [0,1,2];
  let actual = range(0,3);

  if (expected.length != actual.length) return false;

  for (let i = 0; i < expected.length; i++) {
    if (expected[i] != actual[i]) {
      return false;
    }
  }
  return true;
});

//// export //////

module.exports = {
  test: test,
  itest: itest,
  sum: sum,
  range: range,
  equals: equals
}
