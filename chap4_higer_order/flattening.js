/*
 * “flatten” an array of arrays into a single array that has all the elements of the original arrays.
 */

let array_of_arrays = [[1,2,3], [4,5,6], [7,8,9,10]];
let expected = [1,2,3,4,5,6,7,8,9,10];

function flatten(arr_of_arr) {
  return arr_of_arr.reduce((a, b) => a.concat(b));
}

console.log("flattening");
console.log("-".repeat(50));
console.log(array_of_arrays);
console.log(`exptected: ${expected}`);
console.log(`flattened: ${flatten(array_of_arrays)}`);
console.log("-".repeat(50));
