const getPuzzleInput = async () => {
  try {
    const response = await fetch('input.txt');
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error fetching puzzle input:', error);
    throw error;
  }
};

const stringValues = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const findFirstDigit = (inputString) => {
  let indexOfStringValue = -1;
  let indexOfNumberValue = -1;
  let stringValue = -1;
  let numberValue = -1;
  let indexes = [];

  for (let i = 0; i < stringValues.length; i++) {
    if (inputString.includes(stringValues[i])) {
      const startIndex = inputString.indexOf(stringValues[i]);
      const endIndex =
        inputString.indexOf(stringValues[i]) + stringValues[i].length;
      indexes.push([startIndex, endIndex]);
    }
  }

  if (indexes.length > 0) {
    indexOfStringValue = indexes.sort((a, b) => a[0] - b[0])[0];
    stringValue =
      stringValues.indexOf(
        inputString.substring(indexOfStringValue[0], indexOfStringValue[1])
      ) + 1;
  }

  const match = inputString.match(/\d/);
  indexOfNumberValue = match.index;
  numberValue = match ? +match[0] : null;

  if (indexOfStringValue !== -1 && indexOfNumberValue !== -1) {
    return indexOfStringValue[0] < indexOfNumberValue
      ? stringValue
      : numberValue;
  } else {
    return stringValue === -1 ? numberValue : stringValue;
  }
};

const findLastDigit = (inputString) => {
  let indexOfStringValue = -1;
  let indexOfNumberValue = -1;
  let stringValue = -1;
  let numberValue = -1;
  let indexes = [];

  for (let i = 0; i < stringValues.length; i++) {
    if (inputString.includes(stringValues[i])) {
      const startIndex = inputString.lastIndexOf(stringValues[i]);
      const endIndex =
        inputString.lastIndexOf(stringValues[i]) + stringValues[i].length;
      indexes.push([startIndex, endIndex]);
    }
  }

  if (indexes.length > 0) {
    indexOfStringValue = indexes.sort((a, b) => a[0] - b[0])[
      indexes.length - 1
    ];
    stringValue =
      stringValues.indexOf(
        inputString.substring(indexOfStringValue[0], indexOfStringValue[1])
      ) + 1;
  }

  const matches = inputString.match(/\d/g);
  indexOfNumberValue = inputString.lastIndexOf(matches[matches.length - 1]);
  numberValue = matches ? matches[matches.length - 1] : null;

  if (indexOfStringValue !== -1 && indexOfNumberValue !== -1) {
    return indexOfStringValue[0] > indexOfNumberValue
      ? stringValue
      : numberValue;
  } else {
    return stringValue === -1 ? numberValue : stringValue;
  }
};

const getPuzzleInputAndDoSomething = async () => {
  try {
    const puzzleInput = await getPuzzleInput();
    const splittedPuzzleInput = puzzleInput.split('\n');
    const arrayOfCalibrationValues = splittedPuzzleInput.map(
      (el) => +`${findFirstDigit(el)}${findLastDigit(el)}`
    );

    const sumOfCalibrationValues = arrayOfCalibrationValues.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );

    console.log(sumOfCalibrationValues);
  } catch (error) {
    console.error('Failed to get puzzle input:', error);
  }
};

getPuzzleInputAndDoSomething();
