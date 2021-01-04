/* that matches “whitespace or a comment, zero or more times”. Use the exec or match method
 * and look at the length of the first element in the returned array (the whole match) to
 * find out how many characters to slice off.
 */
function skipSpace(string) {
  // strip comments
  string = string.replace(/#.*\n/g, "");
  let first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
  }
  else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: Number(match[0])};
  }
  else if (match = /^[^\s(),#]+/.exec(program)) {
    expr = {type: "word", name: match[0]};
  }
  else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }
  return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(") {
      return {expr: expr, rest: program};
  }

  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",") {
      program = skipSpace(program.slice(1));
    }
    else if (program[0] != ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}

function parse(program) {
  let {expr, rest} = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}

/*
console.log(parse("+(a, 10)"));
console.log(parse("multiplier(2)(1)"));
console.log(parse("# hello\nx"));
console.log(parse("a # one\n   # two\n()"));
*/

module.exports = parse 
