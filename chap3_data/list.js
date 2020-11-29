function arrayToList(arr) {
  let list = {}
  let tail = null;
  for (let e of arr) {
    let elem = createElem(e);
    if (tail == null) {
      list = elem;
      tail = elem;
    }
    else {
      tail.rest = elem;
      tail = elem
    }
  }
  return list;
}

function createElem(e) {
  let elem = {
    value: e,
    rest: null
  }
  return elem;
}

function listToArray(list) {
  let arr = [];
  function helper() {
    if (!list) return arr;
    else {
      let e = list.value;
      list = list.rest;
      arr.push(e);
      return helper();
    }
  }
  return helper();
}

function prepend(value, list) {
  let head = list;
  list = createElem(value);
  list.rest = head;
  return list;

}

function nth(list, n) {
  if (list == null) return;

  if (n == 0) return list.value;

  return nth(list.rest, n-1);
}

let arr = [1,2,3,4];
console.log(`array: ${JSON.stringify(arr)}`);
console.log(`arrayToList: ${JSON.stringify(arrayToList(arr))}`);
console.log(`listToArray: ${JSON.stringify(listToArray(arrayToList(arr)))}`);
console.log(`prepend: ${JSON.stringify(prepend(10, arrayToList(arr)))}`);
console.log(`prepend: ${JSON.stringify(listToArray(prepend(10, arrayToList(arr))))}`);
console.log(`nth: ${nth(arrayToList(arr), 0)}`);
console.log(`nth: ${nth(arrayToList(arr), arr.length-1)}`);
console.log(`nth: ${nth(arrayToList(arr), arr.length)}`);
console.log(`nth: ${nth(arrayToList(arr), 1)}`);
