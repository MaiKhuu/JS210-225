/*
1:20p - 2:20p
P:
  - Given a string representing a number
      - what if it's not a string
      - what if it doens't represent a number?
        - ignore all-non 0-9 chars
      - what if it's an empty string?
  - calculate if it's Luhn

D:
  - input: string
  - output: boolean

A:
  - return false if:
      not a string
  - replace all /D with ""
      return false if ""
  - str => arr =>  map to make all Number
  - iterate backward i = length -2 until i <=0; i -=2
      arr[i] *= 2
      if > 10 => remove 9
  - arr => reduce to make sum
  - % 10 === 0
*/

function isLuhn(str) {
  if (!(typeof(str) === 'string')) return false;
  str = str.replaceAll(/\D/g, "");
  if (str === "") return false;
  let arr = str.split("").map(num => Number(num));
  for (let i = arr.length - 2; i >= 0; i -= 2) {
    arr[i] *= 2;
    if (arr[i] > 9) arr[i] -= 9;
  }
  let sum = arr.reduce((acc, num) => acc + num, 0);
  return sum % 10 === 0;
}

// console.log(isLuhn(123456)); //false
// console.log(isLuhn("asdfasd")); //false
// console.log(isLuhn("")); //false
// console.log(isLuhn("2323 2005 7766 3554")); // true
// console.log(isLuhn("0")); // true
// console.log(isLuhn("1")); // false
// console.log(isLuhn("8763")); //true
// console.log(isLuhn("41517")); //true
// console.log(isLuhn("-----  8    dfgsdf7   sfs6 asg 3")); //true
// console.log(isLuhn("  -sga    11   11")); //false

/*
P:
  - given a string representing number
  - return 1 number that will make this number Luhn
  - return string with correct order

E:
  - result is orgStr + new num at the end
      DO NOT overwrite or mutate org str
  - this changes the index of string

A:
  - return null if not a string
  - remove all \D from str into cleanedStr
  - split => arr => map => Numbers
  - add 0 to arr end
  - calculate checksum
      - for length -2; >=0; -=2
          arr[i] *= 2
          -9 if >= 9
      - reduce(+) => sum
  - if sum % 10 = 0 => resultNum = '0'
      otherwoise resultNum = String(10 - (num % 10))
  - return str + resultNum
*/

function makeLuhn(str) {
  if (!(typeof(str) === "string")) return null;
  let cleanedStr = str.replaceAll(/\D/g, "");
  let arr = cleanedStr.split("")
                      .map(char => Number(char));
  arr.push(0);
  for (let i = arr.length - 2; i >= 0; i-= 2) {
    arr[i] *= 2;
    if (arr[i] > 9) arr[i] -= 9;
  }
  let sum = arr.reduce((acc, num) => acc + num, 0);
  if (sum % 10 === 0) return str;
  let additionalNum = 10 - (sum % 10)
  return str + additionalNum;
}

console.log(makeLuhn(355)); // null
console.log(makeLuhn("2323 2005 7766 355"));
// 2323 2005 7766 3554
console.log(makeLuhn("0")) // 0
console.log(makeLuhn("1")) // 18
console.log(makeLuhn("")) // ""
console.log(makeLuhn("a2323_2005asdf7766 355"))
// a2323_2005asdf7766 3554

