const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true; },
  _content: [1,2,3],
  get content() {
    if (this.locked) throw new Error("Locked!");
    else return this._content;
  }
};

function withBoxUnlocked(f) {
  let result;
  let wasLocked = box.locked;

  // unlock the box
  box.unlock()

  try {
    // apply f to content && return result
    return f(box.content);
  }
  finally {
    if (wasLocked) {
      // lock the box in any case
      // extra: stay unlocked if the box was already unlocked
      box.lock();
    }
  }
}

function test(label, body) {
  console.log(`testing '${label}'...`);
  if (!body()) console.log(`${label} failed!`);
  console.log('---------------------------------');
}

function raiseException(array) { 
  console.log(`got '${array}'`);
  throw new Error(); 
};

test("test f raises exception and stays locked", () => {
  box.lock();
  try {
    withBoxUnlocked(raiseException);
  }
  catch (e) {
    return box.locked == true;
  }
});

test("test f raises exception and stayes unlocked", () => {
  box.unlock();

  try {
    withBoxUnlocked(raiseException);
  }
  catch (e) {
    return box.locked == false;
  }
});

function sum(array) { return array.reduce((a,b) => a+b); }

test("test get result stays locked", () => {
  box.unlock();
  let content = box.content;

  box.lock();
  console.log(`${content} becomes ${withBoxUnlocked(sum)}`);
  return box.locked == true;
});

test("test get result stays unlocked", () => {
  box.unlock();
  let content = box.content;
  console.log(`${content} becomes ${withBoxUnlocked(sum)}`);
  return box.locked == false;
});
