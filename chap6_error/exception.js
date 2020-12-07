function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  }
  else {
    return "two angry bears";
  }
}

try {
  console.log(look());
}
catch (error) {
  console.log(`some thing went wrong: '${error}'`);
  console.log(error.stack);
}
