const {itest, test, equals} = require('../../utils/utils.js');
const {buildGraphObjects, buildGraph} = require('./graph/graph.js');
const roadGraph = require('./road/road.js');
const {VillageState, runRobot} = require('./state/state.js');
const {shortestPathRobot, randomRobot, routeRobot, goalOrientedRobot} = require('./example-robots/example-robots.js');

test("equals", () => {
  return equals([1,2], [1,2]);
}); 

test("buildGraphObjects", () => {
  const array_of_two = [['a','b']];
  const expected = {'a': {'b': 1}, 'b': {'a': 1}};

  //console.log(buildGraphObjects(array_of_two));
  return equals(expected, buildGraphObjects(array_of_two));
});

test("buildGraph", () => {
  const array_of_two = ['a-b', 'a-c'];
  const expected = {'a': ['b', 'c'], 'b': ['a'], 'c': ['a']};

  //console.log(buildGraph(array_of_two));
  return equals(expected, buildGraph(array_of_two));
});

itest("roadGraph", () => {
  console.log(roadGraph);
  return true;
});

test("VillageState", () => {
  let village = VillageState.random();

  console.log(village);
  return true;
});

let village = VillageState.random();

// shortestPathRobot, randomRobot, routeRobot, goalOrientedRobot
test("randomRobot", () => {
  runRobot(village, randomRobot, []);
  return true;
});

test("randomRobot", () => {
  runRobot(village, randomRobot, []);
  return true;
});

test("routeRobot", () => {
  runRobot(village, routeRobot, []);
  return true;
});

test("goalOrientedRobot", () => {
  runRobot(village, goalOrientedRobot, []);
  return true;
});

test("shortestPathRobot", () => {
  runRobot(village, shortestPathRobot, []);
  return true;
});
