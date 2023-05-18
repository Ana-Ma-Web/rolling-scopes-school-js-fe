function countTime(timeStart, timeEnd) {
  const fullSeconds = (timeEnd - timeStart) / 1000;
  if (fullSeconds === 0) {
    return "0s";
  }
  const fullMinutes = Math.floor(fullSeconds / 60);
  const fullHours = Math.floor(fullMinutes / 60);
  const seconds = Math.floor(fullSeconds % 60);
  const minutes = Math.floor(fullMinutes % 60);
  const hours = Math.floor(fullHours % 24);

  let result = "";

  if (hours > 0) {
    result += hours + "h ";
  }
  if (minutes > 0) {
    result += minutes + "m ";
  }
  if (seconds > 0) {
    result += seconds + "s ";
  }

  return result;
}

export default countTime;
