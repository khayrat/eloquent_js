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

console.log(prog);
console.log('-'.repeat(50));
run(prog);
