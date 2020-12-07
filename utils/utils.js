function test(label, body) {
  try {
    if (!body()) console.log(`${label} failed!`);
  }
  catch (e) {
    console.log(`${label} failed with exception: "${e.message}"`);
  }
}

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
  sum: sum,
  range: range
}
