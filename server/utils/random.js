const randomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomBoolean = () => {
  return Math.random() < 0.5;
};

const randomPercentage = () => {
  return randomNumber(0, 100);
};

const randomFromRange = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(1);
};

module.exports = {
  randomItem,
  randomNumber,
  randomBoolean,
  randomPercentage,
  randomFromRange
};
