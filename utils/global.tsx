import moment from "moment";

const convertTime = (time: string): string => {
  const date = moment.unix(parseInt(time)).local().format("MM/DD/YYYY");
  return date;   // returns Tue Jul 15 2014 21:12:31 GMT+0000
}

export {
  convertTime
}