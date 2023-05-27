setup.tests = {};

setup.tests.compare = function (obj1, operator, obj2, testName) {
  var result = false;
  var opName = "";
  switch (operator) {
    case "==":
      result = obj1 == obj2;
      opName = "to be equal to";
      break;
    case "===":
      result = obj1 === obj2;
      opName = "to be strictly equal to";
      break;
    case "!=":
      result = obj1 != obj2;
      opName = "to not equal";
      break;
    case "!==":
      result = obj1 !== obj2;
      opName = "to be strictly not equal to";
      break;
    default:
      console.log("Invalid operator");
      opName = "invalid operator";
      result = false;
  }
  if (result) {
    return `${testName} : PASSED.`;
  } else {
    return `${testName} : FAILED. expected '${obj1}' ${opName} '${obj2}'`;
  }
};
setup.tests.compareNumbers = function (num1, operator, num2, testName) {
  if (isNaN(num1)) {
    return `${testName} : FAILED. Input '${num1}' was Not A Number.`;
  } else if (isNaN(num2)) {
    return `${testName} : FAILED. Other input '${num2}' was Not A Number.`;
  }
  var result = false;
  var opName = "";
  switch (operator) {
    case ">":
      result = num1 > num2;
      opName = "to be greater than";
      break;
    case "<":
      result = num1 < num2;
      opName = "to be less than";
      break;
    case "==":
      result = num1 == num2;
      opName = "to be equal to";
      break;
    case "===":
      result = num1 === num2;
      opName = "to strictly equal";
      break;
    case ">=":
      result = num1 >= num2;
      opName = "to be greater than or equal to";
      break;
    case "<=":
      result = num1 <= num2;
      opName = "to be less than or equal to";
      break;
    case "!=":
      result = num1 != num2;
      opName = "to not equal";
      break;
    case "!==":
      result = num1 !== num2;
      opName = "to strictly not equal";
      break;
    default:
      console.log("Invalid operator");
      opName = "invalid operator";
      result = false;
  }
  if (result) {
    return `${testName} : PASSED.`;
  } else {
    return `${testName} : FAILED. expected '${num1}' ${opName} '${num2}'`;
  }
};
setup.tests.notNull = function (input, testName) {
  if (input !== null) {
    return `${testName} : PASSED.`;
  } else {
    return `${testName} : FAILED. expected '${input}' to not be null.`;
  }
};
setup.tests.isNull = function (input, testName) {
  if (input === null) {
    return `${testName} : PASSED.`;
  } else {
    return `${testName} : FAILED. expected '${input}' to be null.`;
  }
};
setup.tests.compileResults = function (testName, logs) {
  var result = {
    testTotal: logs.length,
    testPassed: 0,
    testFailed: 0,
    overall: "",
    details: "",
  };
  logs.forEach(function (log) {
    if (log.includes("PASSED")) {
      result.testPassed++;
    } else {
      result.testFailed++;
    }
  });
  if (result.testFailed > 0) {
    result.overall = `${testName} - ❌ FAILED: ${result.testFailed} of ${result.testTotal} tests failed.`;
  } else {
    result.overall = `${testName} - ✔ PASSED: ${result.testPassed} of ${result.testTotal} tests passed.`;
  }
  result.details = logs.join("\n");
  return result;
};

setup.tests.testExample = function () {
  var logs = [];

  // num1 not a number
  logs.push(setup.tests.isNull(setup.example("a", 2), "num1 not a number"));

  // num2 not a number
  logs.push(setup.tests.isNull(setup.example(1, "b"), "num2 not a number"));

  // num1 + num2 correct
  logs.push(
    setup.tests.compareNumbers(
      setup.example(1, 2),
      "===",
      3,
      "num1 + num2 is correct"
    )
  );

  // put the results into an object for the displayTestCaseResult macro to use
  return setup.tests.compileResults("testExample", logs);
};
setup.tests.testMary = function () {
  var logs = [];

  // input not a string
  logs.push(
    setup.tests.compare(
      setup.mary(1),
      "===",
      "Mary had a little lamb",
      "input not a string"
    )
  );

  // input is an empty string
  logs.push(
    setup.tests.compare(
      setup.mary(""),
      "===",
      "Mary had a little lamb",
      "input is an empty string"
    )
  );

  // valid input Alice
  logs.push(
    setup.tests.compare(
      setup.mary("Alice"),
      "===",
      "Alice had a little lamb",
      "valid input Alice"
    )
  );

  // purposefully fail test case to demonstrate what it looks like
  logs.push(
    setup.tests.compare(
      setup.mary("Alice"),
      "===",
      "Alice had a big lamb",
      "purposefully fail this test case"
    )
  );

  // compile results for displayTestCaseResult
  return setup.tests.compileResults("testMary", logs);
};
