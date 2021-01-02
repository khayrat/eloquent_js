/*
The function passed to the Promise constructor will have to call then on each of 
the promises in the given array. When one of them succeeds, two things need to happen. 
The resulting value needs to be stored in the correct position of a result array, 
and we must check whether this was the last pending promise and finish our own promise 
if it was.

The latter can be done with a counter that is initialized to the length of the input array 
and from which we subtract 1 every time a promise succeeds. When it reaches 0, we are done. 
Make sure you take into account the situation where the input array is empty 
(and thus no promise will ever resolve).

*/

function Promise_all(promises) {
  if (!promises || promises.length == 0) return Promise.resolve([]);

  let n = promises.length;
  result = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then(v => {
          result[i] = v; 
          n--;
          if (n == 0) resolve(result);
        })
        .catch(r => reject(r));
    }
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});

function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});

Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
    else {
      console.log("passed rejection test.");
    }
  });
