let test = {
  "nulls": [null, null],
  "nulls_obj": [{a: null}, {a: null}],
  "eq_num": [1,1],
  "n_eq_num": [1,0],
  "eq": [
    {
      num: 1,
      str: "hallo",
      array: [1,2,3],
      nested_obj: {
        n_num: 2,
        n_str: "hallo2",
        n_array: [1,2,3],
        n_array_with_objs: [1, 2, {a: 1, b: 2}, 4]
      }
    },  
    {
      num: 1,
      str: "hallo",
      array: [1,2,3],
      nested_obj: {
        n_num: 2,
        n_str: "hallo2",
        n_array: [1,2,3],
        n_array_with_objs: [1, 2, {a: 1, b: 2}, 4]
      }
    }  
  ],
  "n_eq": [
    {
      num: 1,
      str: "hallo",
      array: [1,2,3],
      nested_obj: {
        n_num: 2,
        n_str: "hallo2",
        n_array: [1,2,3],
        n_array_with_objs: [1, 2, {a: 1, b: 2}, 4]
      }
    },  
    {
      num: 1,
      str: "hallo",
      array: [1,2,3],
      nested_obj: {
        n_num: 2,
        n_str: "hallo2",
        n_array: [1,2,3],
        n_array_with_objs: [1, 2, {a: 1, b: 0}, 4]
      }
    }  
  ],
};

console.log(`eq: ${deepEqual(...test.eq)}`);
console.log(`n_eq: ${deepEqual(...test.n_eq)}`);
console.log(`eq_num: ${deepEqual(...test.eq_num)}`);
console.log(`n_eq_num: ${deepEqual(...test.n_eq_num)}`);
console.log(`nulls: ${deepEqual(...test.nulls)}`);
console.log(`nulls_obj: ${deepEqual(...test.nulls_obj)}`);

function deepEqual(a, b) {
//  console.log(`typeof ${a}: ${typeof a}`);
  if (a === b) return true;
  if (typeof a != typeof b) return false;
  if (typeof a != "object") return false;
  
  let a_props = Object.keys(a), b_props = Object.keys(b);

  if (a_props.length != b_props.length) return false;

  for (let prop of a_props) {
    let a_v = a[prop], b_v = b[prop];
    if (typeof a_v == "object") {
      if (!deepEqual(a_v, b_v)) return false;
    }
    else {
      if (a_v !== b_v) return false;
    }
  }
  return true;
} 
