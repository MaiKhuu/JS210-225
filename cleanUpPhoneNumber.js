/*
11:50 - 12:15
P:
  - cleanup phone number so "can be sent as sms"
  - numbers contain:
      digits
      spaces => ignored
      dash - => ignored
      dot . => ignored
      parentheses ( ) => ignored
  - Good number
      has exactly 10 digits
      if has 11 digit and the first num is 1 => trim first 1 and use the rest
  - bad number ==> return "0000000000"
      < 10 digits
      > 11 digit
      11 digit but doesn't start with 1

E:
  - invalid input?
      Not a string?  => retur null
      string containing chars other than 0-9, space, - . ( )
          match(/[^0-9 \.\-\(\)]/g)
  - empty string? invalid

A:
  - HELPER FUNC:
      containsInvalidChar => true if invalid

  - MAIN FUNC:
      return null if containsInvalidChar
      replace all non 0-9 char with ""
      count digit = str.length
      if <10 or > 11 return "0000000000"
      if 10 return digit (cleaned)
      if 11 check 1st digit = 1
        if yes trim tehn return
        if no return "0000000000"
*/

function containInvalidChars(str) {
  return !!(str.match(/[^0-9 \-\.\(\)]/g));
}

function isNotString(input) {
  return !(typeof(input) === 'string');
}

function cleanUpNum(str) {
  if (isNotString(str) || containInvalidChars(str)) return null

  str = str.replaceAll(/[^0-9]/g, '');
  let digitCount = str.length;

  if (digitCount < 10 || digitCount > 11) {
    return "0".repeat(10);
  } else if (digitCount === 10) {
    return str;
  } else if (digitCount === 11) {
    if (str[0] === "1") {
      return str.slice(1);
    } else return "0".repeat(10);
  }
}

// console.log(cleanUpNum(12312)) //null
// console.log(cleanUpNum("123asdf // ?A1dd-()2")) //null
console.log(cleanUpNum("")) // 10-0's
console.log(cleanUpNum("123. 45- 6")) // 10-0's
console.log(cleanUpNum("8956-23456  78912")) // 10-0's
console.log(cleanUpNum("()8956234.56-78912")) // 10-0's
console.log(cleanUpNum("112()345---67891")) // trimed
console.log(cleanUpNum("612()345---67891")) //10-0s
console.log(cleanUpNum("62()345---67891")) //trimmed