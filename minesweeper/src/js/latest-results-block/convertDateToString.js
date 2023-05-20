const convertDateToString = (date) => {
  let time = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
  return time;
};

export default convertDateToString;
