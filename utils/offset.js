const calcOffsetCost = (weight, length, width, height) => {
  const adjustedLength = length / 1000;
  const adjustedWidth = width / 1000;
  const adjustedHeight = height / 1000;
  return (adjustedLength * adjustedWidth * adjustedHeight * weight).toFixed(2);
}


module.exports = calcOffsetCost;