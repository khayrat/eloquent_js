let empty = {};

console.log(Object.getPrototypeOf(empty) === Object.prototype);
console.log(Object.getPrototypeOf(empty));
console.log(Object.getPrototypeOf(Object.prototype));
console.log(Object.getPrototypeOf(Object));

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};

let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");

function Rabbit(type) {
  this.type = type;  
}

Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weiredRabbit = new Rabbit("wired");
weiredRabbit.speak("hallo");

console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
console.log(Object.getPrototypeOf(Rabbit) == Rabbit.prototype);
console.log(Object.getPrototypeOf(weiredRabbit) == Rabbit.prototype);
console.log(Object.getPrototypeOf(weiredRabbit) == weiredRabbit.prototype);
