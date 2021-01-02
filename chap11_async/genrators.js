function* powers(n) {
  for (let current = n;; current *= n) {
    yield current
  }
}

for (let power of powers(3)) {
  if (power > 50) break;
  console.log(power);
}

// iterator for the Group class from chap 6:
Group.prototype[Symbol.iterator] = function*() {
  for (let i = 0; i < this.members.length; i++) {
    yield this.members[i];
  }
}
