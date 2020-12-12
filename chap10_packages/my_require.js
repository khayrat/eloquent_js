////////////// boiler plate code /////////////
fs = require('fs');

function readFile(name) {
  let data = fs.readFileSync(name, 'utf8');
  return data;
}

////////////// the module system /////////////

function my_require(name) {
  if (!(name in my_require.cache)) {
    let code = readFile(name);
    let module = {exports: {}};
    my_require.cache[name] = module;
    
    let wrapper = Function("my_require, exports, module", code);
    wrapper(my_require, module.exports, module);
  }
  return my_require.cache[name].exports;
}

my_require.cache = Object.create(null);


////////////// using the module system /////////////

const {test} = my_require("../utils/utils.js");

test("fail test", () => { return false; });
