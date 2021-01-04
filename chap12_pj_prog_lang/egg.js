const parse = require('./parser.js');
const evaluate = require('./evaluator.js');

const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = value => {
  console.log(value);
  return value;
}

topScope.array = (...args) => {
  return args; 
}
topScope.length = array => {
  return array.length;
};

topScope.element = (array, n) => {
  return array[n];
};

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

//let prog = 'while(true, print("hallo"))';
//let prog = 'if(false, false, true)';
/*
let prog = `
  do(
    define(total, 0),
    define(count, 10),
    while(>(count, 0),
      do(
        define(total, +(total, count)),
        define(count, -(count, 1))
      )),
    print(total)
  )
`;
*/

/*
let prog = `
  do(
    define(plusOne, fun(a, +(a, 1))),
    print(plusOne(10))
  )
`;
*/

/*
let prog = `
  do(
    define(pow, 
           fun(base, exp,
             if(==(exp, 0),
                1,
                *(base, pow(base, -(exp, 1)))
             )
           ),
    ),
    print(pow(2, 10))
  )
`;
*/

/*
let prog = `
  do(define(arr, array(1,2,3)),
  print(arr),
  print(length(arr)),
  print(element(arr,1)))
`;
*/

/*
let prog = `
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`;
*/

/*
let prog = `
do(define(f, fun(a, fun(b, +(a, b)))),
  print(f(3)(2)))
`;
*/

/*
let prog = `
do(define(x, 4),
   define(setx, fun(val, set(x, val)) ),
   setx(50),
   print(x))
`;
*/

let prog = `
do(define(x, 4),
   define(f, fun(
      do(define(x, 5),
         print("x from f: "), print(x)))),
   f(),
   print("outer x: "), print(x))
 `;
/*
let prog = `
  set(quux, true)
`;
*/

console.log(prog);
console.log('-'.repeat(50));
run(prog);
