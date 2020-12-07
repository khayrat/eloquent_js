class MultiplicatorUnitFailure extends Error {}

function primitiveMulitply(a, b) {
  let randomEvent = Math.random();
  if (randomEvent <= 0.2) return a*b;
  if (randomEvent > 0.2 && randomEvent <= 0.4) throw new Error("regular Error");
  else throw new MultiplicatorUnitFailure("flacky error")
}

function multiply(a,b) {
  while (true) {
    try {
      return primitiveMulitply(a,b);
    }
    catch (error) {
      if (error instanceof MultiplicatorUnitFailure) {
        continue;
      }
      else {
        throw error;
      }
    }
  }
}

let a = 5, b = 10;
console.log(`multiply(${a}, ${b}): ${multiply(a,b)}`);
