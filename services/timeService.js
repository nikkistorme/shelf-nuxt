const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (date) => {
  const dateObject = new Date(date);
  const dateMonth = months[dateObject.getMonth()];
  const dateDate = dateObject.getDate();
  const dateYear = dateObject.getFullYear();
  const dateString = `${dateMonth} ${dateDate} ${dateYear}`;
  return dateString;
};

export const getTimeString = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const nowTime = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
  return nowTime;
};

export const HhMmDifferenceInMinutes = (time1, time2) => {
  const start = new Date(`1111-11-11 ${time1}`);
  const end = new Date(`1111-11-11 ${time2}`);
  const diffMilliseconds = end - start;
  const diffMinutes = Math.round(
    ((diffMilliseconds % 86400000) % 3600000) / 60000
  );
  return diffMinutes;
};
