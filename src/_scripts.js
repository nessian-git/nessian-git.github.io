/* This file is a sample of custom javascript that you would like to test */
setup.example = function (num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return null;
  }
  return num1 + num2;
};
setup.mary = function (str) {
  if (typeof str !== "string" || str == "") {
    console.log(str + " was not a string or was empty");
    return "Mary had a little lamb";
  }
  return str + " had a little lamb";
};
