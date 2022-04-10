const degToCompass = (num) => {
  let val = Math.floor(Number(num) / 22.5 + 0.5);
  const arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  return arr[val % 16];
};

export default degToCompass;