let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
//console.log(map.hasOwnProperty("one"));

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true
/*
 Remember that methods that exist on plain objects come from Object.prototype.

 Also remember that you can call a function with a specific this binding by using its call method.
 */
