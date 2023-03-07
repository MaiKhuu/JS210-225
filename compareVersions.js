/*
10:50AM
P:
  - given 2 version Num
  - returns : -1 if v1 < v2
               0 if v1 = v2
               1 if v1 > v2
  - invalid input? :
      - not string
      - contain non 0-9 or .
      - starts with .?
      - does not contain at least 1 0-9
E
  - v is a string of numbers separated by /
      - in valid input? return null
  - arguments may have different number of numbers

D:
  - I: string, string
      to be converted to array
  - output: 1, 0, -1, or null

A:
  - helper function largerThan(v1, v2) => true if v1 > v2
      - split both by "."
      - equalize array lengths by adding "0".filled element to shorter one;
      - iterate using for loop with i
          - v1[i] > v2[i] => return true
          - v1[i] < v2[i] => return false
      - return false

  MAIN FUNCTION:
    - check for null-result problem
        helper functions => if any of these are met, return null and quit:
          isString, invalidChar, startsWithPeriod, noNumberDetected

    - if:
        largerThan(v1, v2) => return 1
        largerThan(v2, v1) => return -1
        otherwise return 0
*/

function isString(item) {
  return typeof(item) === 'string';
}

function invalidChar(str) {
  return !!(str.match(/[^0-9\.]/g));
}

function startsWithPeriod(str) {
  return !!str.match(/^\./);
}

function endsWithPeriod(str) {
  return !!str.match(/\.$/g);
}

function numberDetected(str) {
  return !!str.match(/[0-9]/);
}

function emptyString(str) {
  return str === "";
}

function consecutivePeriod(str) {
  return !!(str.match(/\.\./g))
}
function checkNullReturned(v) {
  return !(isString(v) &&
          !emptyString(v) &&
           numberDetected(v) &&
          !invalidChar(v) &&
          !startsWithPeriod(v) &&
          !consecutivePeriod(v) &&
          !endsWithPeriod(v));
}

function largerThan(v1, v2) {
  [v1, v2] = [v1, v2].map(v => v.split('.').map(section => Number(section)));
  let difference = Math.abs(v1.length - v2.length);
  if (v1.length < v2.length) {
    v1 = v1.concat(Array(difference).fill(0));
  } else {
    v2 = v2.concat(Array(difference).fill(0));
  }
  for (let i = 0; i <= v1.length - 1; i++) {
    if (v1[i] < v2[i]) {
      return false;
    } else if (v1[i] > v2[i]) {
      return true;
    }
  }
  return false;
}

function compareVersions(v1, v2) {
  console.log(v1, checkNullReturned(v1))
  if (checkNullReturned(v1) || checkNullReturned(v2)) return null;
  // if (!(v1.match(/^[0-9](\.[0-9]+)*$/g))) return null;
  if (largerThan(v1, v2)) return 1;
  if (largerThan(v2, v1)) return -1;
  return 0;
}

// console.log(compareVersions("0.1", "1")); //-1
// console.log(compareVersions("1", "0.1")); //1
// console.log(compareVersions("1.0", "1")); //0
// console.log(compareVersions("1.2", "1.1")); //1
// console.log(compareVersions("1.0", "1.2")); //-1
// console.log(compareVersions("01.1", "1.1")); //0
// console.log(compareVersions("01.1", "1.2.3")); //-1
// console.log(compareVersions("1.2.0.0", "1.2")); //0
// console.log(compareVersions("1.2.0.0", "1.18.2")); //-1
// console.log(compareVersions("1.18.2", "13.37")); // -1
// console.log(compareVersions("1.18.2", "asdfa")); //null
// console.log(compareVersions(".5", "1.18.2")); //null
// console.log(compareVersions("1.18.2", 1.25)); //null
// console.log(compareVersions("1.18.2", ".")); // null
// console.log(compareVersions("1.18.2", "1..2")); //null
// console.log(compareVersions('1', '1'));            // 0
// console.log(compareVersions('1.1', '1.0'));        // 1
// console.log(compareVersions('2.3.4', '2.3.5'));    // -1
// console.log(compareVersions('1.a', '1'));          // null
// console.log(compareVersions('.1', '1'));           // null
// console.log(compareVersions('1.', '2'));           // null
// console.log(compareVersions('1..0', '2.0'));       // null
// console.log(compareVersions('1.0', '1.0.0'));      // 0
// console.log(compareVersions('1.0.0', '1.1'));      // -1
// console.log(compareVersions('1.0', '1.0.5'));      // -1
