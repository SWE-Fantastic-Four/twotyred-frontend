export const capitalise = (words) => {
  const wordsArray = words.split(" ");
  const newWords = wordsArray.map(word => {
    const newWord = word[0] + word.substring(1).toLowerCase()
    return newWord;
  });
  return newWords.join(" ");
}

export const truncate = (words, length) => {
  return words.length > length ? words.substring(0, length) + "..." : words;
}
