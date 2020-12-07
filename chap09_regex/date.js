const {test} = require('../utils/utils.js');

function getDate(string) {
  try {
    let [_, day, month, year] = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(string);
//    console.log("groups: ", _, day, month, year);
    return new Date(day, month-1, year);
  }
  catch (e) {
    throw new Error(`wrong date string: '${string}'`); 
  }


}

test("getDate", () => {
  let day = 2, month = 12, year = 1999;
  let dateString = `${day}.${month}.${year}`;

  return new Date(day, month-1, year).getTime() == getDate(dateString).getTime();
});

test("getDate - should not match", () => {
  return getDate("312.12.2001") instanceof Date;
});

