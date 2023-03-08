/*
10:44Am - 11:12Am
Write the ENCODING and DECODING for a rail cipher

Rule:
  - input is always a string
                    case insensitive (assume uppercase)
  - output is always a string
  - Rail cipher ENCODING:
      -
*/

function railFenceEncoding(str) {
  if (!(typeof(str) === 'string')) return null;
  str = str.toUpperCase().replaceAll(/[^a-z0-9]/gi, "");
  let result = "";
  for (let i = 0; i <= str.length - 1; i += 4) result += str[i];
  for (let i = 1; i <= str.length - 1; i += 2) result += str[i];
  for (let i = 2; i <= str.length - 1; i += 4) result += str[i];
  return result;
}

function railFenceDecoding(str) {
  if (!(typeof(str) === "string")) return null;

  let n = str.length;

  let topTotal = Math.ceil(n / 4);
  let topChars = str.slice(0, topTotal);

  let midTotal = Math.floor(n / 4) * 2;
  if (n % 4 >= 2) midTotal += 1;
  let midChars = str.slice(topTotal, topTotal + midTotal);

  let botTotal = n - topTotal - midTotal;
  let botChars = str.slice(topTotal + midTotal);

  let result = "";
  let [topCount, midCount, botCount] = [0, 0, 0];
  while (result.length < str.length) {
    result += topChars[topCount++];
    if (result.length === str.length) break;
    result += midChars[midCount++];
    if (result.length === str.length) break;
    result += botChars[botCount++];
    if (result.length === str.length) break;
    result += midChars[midCount++];
  }

  return result;
}

console.log(railFenceEncoding("WE ARE DISCOVERED FLEE AT ONCE") == "WECRLTEERDSOEEFEAOCAIVDEN"); //
console.log(railFenceEncoding("This is a message") == "TIEGHSSMSAEIAS");
console.log(railFenceEncoding(234) == null);
console.log(railFenceEncoding("") == "");


console.log(railFenceDecoding("WECRLTEERDSOEEFEAOCAIVDEN") == "WEAREDISCOVEREDFLEEATONCE");
console.log(railFenceDecoding("TIEGHSSMSAEIAS") == "THISISAMESSAGE");
console.log(railFenceDecoding(234) == null);
console.log(railFenceDecoding("") == "");
