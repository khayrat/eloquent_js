const nums = [50, 75, -1];

const isEven = n => {
  if (n < 0) n = -n;
  if (n == 0) return true;
  if (n == 1) return false;
  else return isEven(n-2);
}

for (let i = 0; i < nums.length; i++) {
  n = nums[i];
  console.log(`isEven(${n}) = ${isEven(n)}`);
}
