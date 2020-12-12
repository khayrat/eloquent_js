const roadGraph = require("../road/road.js");
const randomPick = require('../random-pick/random-pick.js');

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House", "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm", "Marketplace", "Post Office"
];

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

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}
function routeRobot(state, memory) {
  // ensure that the route is traveled twice
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function goalOrientedRobot(state, memory) {
  function buildArrayOfTwos(edges) {
    let result = [];
    for (let [from, to] of edges.map(edge => edge.split('-'))) {
      result.push([from, to]);
    }

    return result;
  }

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

module.exports = {
  shortestPathRobot: shortestPathRobot,
  randomRobot: randomRobot,
  routeRobot: routeRobot,
  goalOrientedRobot: goalOrientedRobot
}
