/*
10:25pm

P:
  - given a list of "short-hand" numbers
      - "short hand" rules?
          - only significnat part of the next nubmer is written
          - types of short hands:
              - comma only: "1, 3, 7, 2, 4, 1"
              - dash only: "104-2", "104-02"
                  dash is the same with ..
              - range and dash: "1-3, 1-2"
              - colon: "1:5:2"
  - if a 0 is included, it matters
  -
  - number list is always increasing
  - return the list of complete numbers
      - range is inclusive on both ends

E:
  - "1, 3, 7, 2, 4, 1" returns [1, 3, 7, 12, 14, 21]
    1 < 3: ok[]
    3 < 7 ok
    7 > 2 => add 1 => 12, 14, 11
                      12 < 14 ok
                      14 > 11 => add 2
                              21


  - "1-3, 1-2"  returns [1, 2, 3, 11, 12]
      1-3 has a - => 1,2,3
      1-2 has a - => 1,2
      input becomes 1,2,3,1,2
      per previous rule: 1, 2, 3, 11, 12

  - "1:5:2" returns [1, 2, 3, 4, 5, 6, ... 12]
     1 < 5 => 1-5 => 1,2,3,4,5
     5 > 2 => 5-12 => 5,6,7,8,9,10,11,12
     input becomes 1,2,3,4,5,6,7,8,9,10,11,12
     per previous rule: 1,2,3,4,5,6,7,8,9,10,11,12

  - "104-2" returns [104, 105, ... 112]

  - "545, 64:11"
    split by comma:
      545 and 64:11
              64:111
      545     64 65 66 67 ... 111
      545 564 566 ... 611

Rule:
  - check clusters between commas 1st
                           : and - => need to change to comma clusters
  - colon clusters: a:b:c
      if a < b => [a..b]
      if a > b add number to front of b until a < b then [a..b]
      convert to comma cluster
  - dash clusters a-b
      add number to front of b until a < b => return [a..b]

Input: string
Output: array of Int

A:
  HELPER FUNCTION:
    - processInputString
        - replace all .. with -
        - split str into cluster by comma
        - process each cluster
            - if include dash => generateDashNums
            - if inlude colon => generateColonNums
        - flatMap all result

    - generateRange(starter, ender)
        - return [starter..ender]

    - addPreNum(numStr, marker)
        - add 1 to infinity to front of num until numStr > marker
        - return result

    - generateDashNums
        - split by -  ==> arr
        - if arr[0] > arr[1] // numeric
            arr[1] = addPreNum(arr[1], a[0])
        - return generateRamge(arr[0], arr[1])

    - generateColonNums
        - split by :
        - resultArr = []
        - for i: 0->length -2
            if arr[i] > arr[i+1]  /// num comparision
              arr[i+1] = addPreNum(arr[i+1], arr[i])  // strings
            generateRange(arr[i], arr[i+1])
        - return arr

  MAIN FUNCTION:
    - processInputString => arr
*/

function generateRange(starter, ender) {
  let result = [];
  for (let i = starter; i <= ender; i++) result.push(i);
  return result.map(num => String(num));
}

function splitByComma(str) {
  str = str.replaceAll(/\.\./g, "-")
           .replaceAll(/[^\d\,\-\:]/g,'')
           .split(",");
  return str;
}

function addPrefix(num, marker) {//both are string
  let prefix = 1;
  while (marker > Number(prefix + num)) prefix++;
  return Number(prefix+num);
}

function generateDashNums(str) {
  str = str.split("-");
  let starter = Number(str[0]);
  let ender = Number(str[1]);
  if (starter > ender) {
    ender = addPrefix(str[1], str[0]);
  }
  return generateRange(starter, ender);
}

function generateColonNums(str) {
  let arr = str.split(":");
  let result = [arr[0]];
  for (let i = 0; i <= arr.length - 2; i++) {
    result.push(generateDashNums(`${arr[i]}-${arr[i+1]}`).slice(1));
  }
  return result.flatMap(cluster => cluster)
}

function createFinalNums(arr) {
  let orgArr = arr.slice(0);
  let prefix = 0;

  arr[0] = Number(arr[0]);
  for (let i = 1; i <= arr.length - 1; i++) {
    if (orgArr[i].length > orgArr[i-1].length) prefix = 0;
    while (Number(prefix + orgArr[i]) < arr[i-1]) prefix++;
    arr[i] = Number(prefix + orgArr[i]);
  }
  return arr;
}

function generateShortHandClusters(arr) {
  let len
  for (let i = 1; i <= arr.length -1; i++) {
    if (arr[i].length > arr[i-1].length) {
      arr[i] = arr[i].slice(arr[i].length - arr[i-1].length);
    }
  }
  return arr;
}
function completeNumbers(str) {
  let commaClusters = splitByComma(str);
  let expandedClusters = [];
  commaClusters.forEach(cluster => {
    if (cluster.includes("-")) {
      expandedClusters.push(generateDashNums(cluster));
    } else if (cluster.includes(":")) {
      expandedClusters.push(generateColonNums(cluster));
    } else {
      expandedClusters.push(cluster)
    }
  });
  expandedClusters = expandedClusters.flatMap(cluster => cluster);
  let shorthandClusters = generateShortHandClusters(expandedClusters);
  return createFinalNums(shorthandClusters);
}

console.log(completeNumbers("1, 3, 7, 2, 4, 1" )); // 1, 3, 7, 12, 14, 21
console.log(completeNumbers("1-3, 1-2" )); // 1, 2, 3, 11, 12
console.log(completeNumbers("1:5:2")); // 1, 2, 3, 4, 5, 6, ... 12
console.log(completeNumbers("104-2")); // 104, 105, ... 112
console.log(completeNumbers("545, 64:11")); //  545, 564, 565, .. 611
console.log(completeNumbers("1-3, 1-2",)); //  [1, 2, 3, 11, 12]
console.log(completeNumbers("1:3, 1:2",)); //  [1, 2, 3, 11, 12]
console.log(completeNumbers("1..3, 1..2")); //  [1, 2, 3, 11, 12]