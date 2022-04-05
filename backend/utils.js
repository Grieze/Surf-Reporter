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

const utcToEst = (hour) => {
  // UTC time is 4 hours ahead during daylight savings time
  hour = parseInt(hour);
  hour < 4 ? hour + 20 : hour - 4;
  return hour.toString();
}