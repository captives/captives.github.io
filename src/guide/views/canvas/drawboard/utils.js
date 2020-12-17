function pad(str, length) {
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}

function getRandomColor() {
  return [
    getRandomNum(0, 255).toString(16),
    getRandomNum(0, 255).toString(16),
    getRandomNum(0, 255).toString(16),
  ].join("");
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomLeftTop() {
  return {
    left: getRandomNum(10, 400),
    top: getRandomNum(10, 400),
  };
}

module.exports = {
  // getRandomNum,
  // getRandomColor,
  // getRandomLeftTop,
};
