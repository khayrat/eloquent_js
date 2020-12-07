function numberToString(n, base = 10) {
  let result = "", sign = "";
  if (n < 0) {
    sign = "-";
    n    = -n;
  }
  do {
    result = String(n % base) + result;
    console.log("n: ", n);
    console.log("result: ", result);
    n = Math.floor(n/base);
    //n /= base;
  } while (n > 0)
  return result;
}

console.log(numberToString(13, 10));
console.log("-".repeat(50));
console.log(numberToString(13, 2));
