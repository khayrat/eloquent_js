const tests = {
  "BaBcbB": 3,
  "aBBab":  2,
  "Bab": 1,
  "abB": 1,
  "adfdsf": 0
};

for (test in tests) {
  let expected = tests[test];
  console.log(`'${test}' expected to have ${expected} 'B's: ${expected === countBs(test)}`);
}

function countChar(string, char) {
  let result = 0;
  for (let i = 0; i < string.length; i++) {
    if (char === string[i]) result++;
  }
  return result;
}

function countBs(string) {
  return countChar(string, 'B');
}
