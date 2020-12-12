let arr = [1,2,3,4, 5];

console.log(`reverseArray(${arr}) == ${reverseArray(arr)}`);
console.log(`${arr} == reverseArray(${arr}): ${arr == reverseArray(arr)}`);
console.log(`reverseArrayInPlace(${arr}) == ${reverseArrayInPlace(arr)}`);
console.log(`${arr} == reverseArrayInPlace(${arr}): ${arr == reverseArrayInPlace(arr)}`);

function reverseArray(arr) {
  let result = [];
  for (let i = arr.length - 1; i >= 0; i--) result.push(arr[i]);
  return result;
}

function reverseArrayInPlace(arr) {
  let rightest = arr.length - 1;
  for (let i = 0; i <= rightest; i++, rightest--) {
    let temp = arr[rightest];
    arr[rightest] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
