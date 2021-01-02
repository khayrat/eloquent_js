const asyncForEach = (array, cb) => {
  array.forEach(i => {
    setTimeout(cb, 0, i);
  });
}

asyncForEach([1,2,3], i => {
  console.log(i);
});

console.log("hallo");
