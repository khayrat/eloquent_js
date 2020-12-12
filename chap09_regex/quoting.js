const {test} = require('../utils/utils');

let regex = /^'|(\W)'|'(\W)|'$/g;

test("single to double quotes", () => {
  let text = `Arthur said 'don't do this' to me. Then after a while continued 
    'ok I'll be back'`;
  let expected = `Arthur said "don't do this" to me. Then after a while continued 
    "ok I'll be back"`;
  let result = text.replace(regex,'$1"$2');
  //console.log(result);

  return expected == result;
});

test("another one", () => {
  let text = "'I'm the cook,' he said, 'it's my job.'";
  let expected = `"I'm the cook," he said, "it's my job."`;
  let result = text.replace(regex,'$1"$2');
  //console.log(result);

  return expected == result;
});

test("string equal", () => {
  return "hallo" == "hallo";
});

