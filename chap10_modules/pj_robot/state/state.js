const roadGraph = require('../road/road.js');
const randomPick = require('../random-pick/random-pick.js');

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

function runRobot(state, robot, memory) {
  let turn;
  //console.log("initial state: ", state);
  for (turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`finished in ${turn} runs`);
      break;
    }
    //console.log("calling robot with memory:", memory);
    let action = robot(state, memory);
    //console.log("action:", action);
    state = state.move(action.direction);
    memory = action.memory;
    //console.log(`Moved to ${action.direction}`);
    //console.log("new state: ", state);
  }
  return turn;
}

module.exports = {
  VillageState: VillageState,
  runRobot: runRobot
}
