const roads = [
  "Alice's House-Bob's House",   "Alice's House-Post Office", 
  "Daria's House-Ernie's House", "Ernie's House-Grete's House", 
  "Grete's House-Shop",          "Marketplace-Post Office", 
  "Marketplace-Town Hall",       "Alice's House-Cabin", 
  "Bob's House-Town Hall",       "Daria's House-Town Hall", 
  "Grete's House-Farm",          "Marketplace-Farm", 
  "Marketplace-Shop",            "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);

  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    }
    else {
      graph[from].push(to);
    }
  }

  for (let [from, to] of edges.map(edge => edge.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place   = place;   // the current location of the robot
    this.parcels = parcels; // the undelivered parcels
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      //console.log(`no path from ${this.place} to ${destination}`);
      return this;
    }

    //console.log(`move to ${destination}`);

    let parcels = this.parcels.map(p => {
      //console.log(`current place: ${this.place}, parcel to check: { place: ${p.place}, address: ${p.address} } `);
      // consider only parcels on the current place
      if (p.place != this.place) {
        //console.log("parcel not moved.");
        return p; 
      }
      else {
        let parcel = { place: destination, address: p.address };
        //console.log(`moved parcel: { place: ${parcel.place}, address: ${parcel.address} } `);
        return parcel;
      }
    }) 
      // deliver
      .filter(p => {
        if (p.place == p.address) ; //console.log(`delivering parcel to ${p.address}`);
        return p.place != p.address
      });
      //.filter(p => p.place != p.address);
    let v = new VillageState(destination, parcels);
    return new VillageState(destination, parcels);
  }
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let count = 0; count < parcelCount; count++) {
    let place = randomPick(Object.keys(roadGraph));
    let address;
    do {
      address = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

function testVillageSate() {
  let first = new VillageState(
    "Post Office", 
    [{place: "Post Office", address: "Alice's House"}]
  );

  let next = first.move("Alice's House");

  console.log(next.place);
  console.log(next.parcels);
  console.log(first.place);
}

function runRobot(state, robot, memory) {
  let turn;
  console.log("initial state: ", state);
  for (turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`finished in ${turn} runs`);
      break;
    }
    console.log("calling robot with memory:", memory);
    let action = robot(state, memory);
    //console.log("action:", action);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
    console.log("new state: ", state);
  }
  return turn;
}

function runRobotAndGetTurns(state, robot, memory) {
  let turn;
  for (turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
  return turn;
}

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House", "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm", "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  // ensure that the route is traveled twice
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  let work = [ {at: from, route:[]} ];
  // we can't use the iterator interface here, because 
  // we're pushing to the work-list while interating it.
  //
  //console.log(`findRoute(from: ${from}, to: ${to})`);
  for (let i = 0; i < work.length; i++) {
    // examine each work-item
    let {at, route} = work[i];
    //console.log("current work-item: ", at, route);
    for (let place of graph[at]) {
      // examine each node directly connected with the node
      // of the current work-item
      if (place == to) {
        // we're done if this node is the destination
        //console.log("route found: ", route.concat(place));
        return route.concat(place);
      }
      if (!work.some(w => w.at == place)) {
        // given the examined node is not already in the work-list
        // extend the worklist wiht it
        //console.log("extending worklist with: ", {at: place, route: route.concat(place)});
        work.push({at: place, route: route.concat(place)});
      }
    }
    //console.log("continue examining the remainig/updated worklist");
    // continue examining the remainig/updated worklist
  }

}

function goalOrientedRobot(state, memory) {
  let { place, parcels } = state, route = memory;
  //console.log("robot with place:", place, "parcels: ", parcels);
  if (route.length == 0) {
    let parcel = parcels[0];
    if(place == parcel.place) {
      // we are on place with a parcel and
      // have to find a route to its destination
      //console.log("find delivering route");
      route = findRoute(roadGraph, place, parcel.address);
    }
    else {
      // we have to find a route to the nearest place
      // having a parcel
      //console.log("find pickup route");
      route = findRoute(roadGraph, place, parcel.place);
    }
    //console.log(`found route: ${route}`);
  }
  return { direction: route[0], memory: route.slice(1) };
}

let village = VillageState.random();
village.parcels = [
    { place: "Bob's House", address: "Alice's House" },
    { place: "Ernie's House", address: "Alice's House" },
    { place: "Bob's House", address: "Daria's House" },
    { place: 'Marketplace', address: 'Farm' },
    { place: 'Town Hall', address: 'Cabin' }
  ]
//console.log(village);
//runRobot(village, randomRobot);
//runRobot(village, routeRobot, []);
//runRobot(village, goalOrientedRobot, []);

roadGraph;
//module.exports = roadGraph;

function compareRobots(r1, r2) {
  let rob1 = r1.roboter, rob1_mem = r1.memory; 
  let rob2 = r2.roboter, rob2_mem = r2.memory; 
  let rob1_turns = [], rob2_turns = [];
  let tasks = 1000;

 
  for (let i = 0; i < tasks; i++) {
    let village = VillageState.random();
    rob1_turns.push(runRobotAndGetTurns(village, rob1, rob1_mem));
    rob2_turns.push(runRobotAndGetTurns(village, rob2, rob2_mem));
  }
  return { avg_r1: avg(rob1_turns), avg_r2: avg(rob2_turns) };
}

function sum(list) {
  let result = 0;
  for (let n of list) result += n;
  return result;
}

function avg(array) {
  return sum(array) / array.length;
}

function compareAll() {
  let avg_r1, avg_r2;
  let avgs = compareRobots({roboter: routeRobot, memory: []}, {roboter: goalOrientedRobot, memory: []});
  avg_r1 = avgs.avg_r1;
  avg_r2 = avgs.avg_r2;
  console.log(`averages: routeRobot: ${avg_r1}, goalOrientedRobot: ${avg_r2}`); 

  avgs = compareRobots({roboter: randomRobot, memory: []}, {roboter: goalOrientedRobot, memory: []});
  avg_r1 = avgs.avg_r1;
  avg_r2 = avgs.avg_r2;
  console.log(`averages: randomRobot: ${avg_r1}, goalOrientedRobot: ${avg_r2}`); 

  avgs = compareRobots({roboter: shortestPathRobot, memory: []}, {roboter: goalOrientedRobot, memory: []});
  avg_r1 = avgs.avg_r1;
  avg_r2 = avgs.avg_r2;
  console.log(`averages: shortestPathRobot: ${avg_r1}, goalOrientedRobot: ${avg_r2}`); 
}


/*
 * One possible solution would be to compute routes for all packages and then take the
 * shortest one. Even better results can be obtained, if there are multiple shortest routes,
 * by preferring the ones that go to pick up a package instead of delivering a package.
 */
 
 function shortestPathRobot(state, memory) {
    if (memory.length == 0) {
      memory = findShortestPath(state);
      //console.log("shortest path: ", memory)
    }

    return {direction: memory[0], memory: memory.slice(1)};
 }

function findShortestPath(state) {
  let { place, parcels } = state;

  // get shortes pickup-path
  let pickup_pathes = [];
  for (let parcel of parcels.filter(p => p.place != place)) {
    pickup_pathes.push(findRoute(roadGraph, place, parcel.place));
  }
  
  // get shortest delivery-path
  let delivery_pathes = []
  for (let parcel of parcels.filter(p => p.place == place)) {
    delivery_pathes.push(findRoute(roadGraph, place, parcel.address));
  }

  if (pickup_pathes.length > 0) {
    if (delivery_pathes.length > 0) {
      let shortest_pickup = pickup_pathes.reduce((p1, p2) => p1.length < p2.length ? p1 : p2);
      let shortest_delivery = delivery_pathes.reduce((p1, p2) => p1.length < p2.length ? p1 : p2);
      // prefer pickup-path (<=)
      return shortest_pickup.length <= shortest_delivery.length ? shortest_pickup : shortest_delivery;
    }
    return pickup_pathes.reduce((p1, p2) => p1.length < p2.length ? p1 : p2);
  }
  else {
    return delivery_pathes.reduce((p1, p2) => p1.length < p2.length ? p1 : p2);
  }
}

//runRobot(village, shortestPathRobot, []);

compareAll();
