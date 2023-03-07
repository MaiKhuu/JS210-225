function countWords(sentence) {
  return sentence.match(/[^ .?!]*/g)
    .filter(word => word.length !== 0)
    .length;
}

function findLongestSentenceIdx(wordCounts) {
  return wordCounts.reduce((longestIdx, current, idx) => {
    if (current > wordCounts[longestIdx]) {
      return idx;
    } else {
      return longestIdx;
    }
  }, 0);
}

function splitTextIntoSentences(text) {
  return text.match(/\w[^.?!]*[.?!]/g)
    .map(s => s.trim())
    .filter(s => s.length > 0);

}

function displayResult(sentence, wordCount) {
  console.log(sentence);
  console.log();
  console.log(`The longest sentence has ${wordCount} word${wordCount === 1 ? '' : 's'}.`);
}

function displayError(text) {
  if (typeof (text) !== 'string') {
    console.log("Invalid input.");
  } else if (!text.match(/[.!?]/) || !text.match(/\w/)) {
    console.log("There is no complete sentence in the given text.");
  }
}

function longestSentence(text) {
  if (typeof (text) !== 'string' || !text.match(/[.?!]/) || !text.match(/\w/)) {
    displayError(text);
    return;
  }

  let sentenceList = splitTextIntoSentences(text);
  let wordCounts = sentenceList.map(s => countWords(s));
  let longestSentenceIndex = findLongestSentenceIdx(wordCounts);

  displayResult(sentenceList[longestSentenceIndex], wordCounts[longestSentenceIndex]);
}

longestSentence(" a  .")