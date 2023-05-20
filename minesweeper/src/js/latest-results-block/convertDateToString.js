const convertDateToString = (date) => {
  let time = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
  return time;
};

export default convertDateToString;
