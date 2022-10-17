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

export const checkPasswordStrength = (password) => {
  if (password.length < 8) {
    throw new Error("Password length too short.");
  } else if (!checkLowercase(password)) {
    throw new Error("Password does not contain lowercase letters.");
  } else if (!checkUppercase(password)) {
    throw new Error("Password does not contain uppercase letters.");
  } else if (!checkNumber(password)) {
    throw new Error("Password does not contain a number.");
  } else if (!checkSymbols(password)) {
    throw new Error("Password does not contain a symbol.");
  }
}

const checkLowercase = (str) => {
  for (var i=0; i<str.length; i++){
    if (str.charAt(i) == str.charAt(i).toLowerCase() && str.charAt(i).match(/[a-z]/i)){
      return true;
    }
  }
  return false;
};

const checkUppercase = (str) => {
  for (var i=0; i<str.length; i++){
    if (str.charAt(i) == str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)){
      return true;
    }
  }
  return false;
}

const checkNumber = (str) => {
  return /\d/.test(str);
}

const checkSymbols = (str) => {
  const symbols = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return symbols.test(str);
}
