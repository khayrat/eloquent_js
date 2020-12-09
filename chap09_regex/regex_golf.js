const {test} =  require('../utils/utils');

// car and cat
test("car and cat", () => {
  let regex = /ca[rt]/;
  let result = true
    && "caror".match(regex) 
    && "cator".match(regex)
    && "afsdfcator".match(regex)
    && "carafsdfcator".match(regex);

  return result;
});

// pop and prop
test("pop and prop", () => {
  let regex = /pr?op/;
  let result = true
    && "pop".match(regex) 
    && "prop".match(regex)
    && "sdfdspop".match(regex)
    && "popprop".match(regex);

  return result;
});

// ferret, ferry and ferrari
test("ferret, ferry and ferrari", () => {
  let regex = /ferr(et)|y|(ari)/;
  let result = true
    && "ferret".match(regex) 
    && "ferry".match(regex)
    && "ferrari".match(regex);

  return result;
});

// Any word ending with ious
test("Any word ending with ious", () => {
  let regex = /\b.*ious\b/;
  let result = true
    && "miracious".match(regex) 
    && "sdfdsf blaious sfsdf".match(regex)
    && !"sdfdsfioussdfdsfs".match(regex);

  return result;
});

// A whitespace character followed by a period, comma, colon, or semicolon
test("A whitespace character followed by a period, comma, colon, or semicolon", () => {
  let regex = /\s[.,;-]/;
  let result = true
    && "sdfsf .sfds".match(regex)
    && "sdfsf ;sfds".match(regex)
    && "sdfsf -sfds".match(regex)
    && "sdfsf -sfds".match(regex)
    && `sdfsf
    -sfds`.match(regex)
    && "sdfdsf ,sdfdsfsdf".match(regex);

  return result;
});

// A word longer than six letters
test("A word longer than six letters", () => {
  let regex = /\b\w{6,}\b/;
  let result = true
    && !"12345".match(regex)
    && "sdfs 123456 sdfds".match(regex)
    && "1234567".match(regex)
    && "123456".match(regex);

  return result;
});

// A word without the letter e (or E)
test("A word without the letter e (or E)", () => {
  let regex = /\b[a-df-zA-DF-Z0-9]+\b/;
  let result = true
    && !"abcdefg".match(regex)
    && !"ABCDEFG".match(regex)
    && "sdfdsf sdfdsf dsfsdfsde".match(regex)
    && "1234567 sfsddf".match(regex)
    && "1e2345i sdfds".match(regex);

  return result;
});


