import moment from "moment";
import { formatGroupLabel } from "react-select/src/builtins";

let unix_timestamp = 1549312452
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

console.log(formattedTime);

const convertUnixTime = (time: string): string => {
  let unix_timestamp = parseInt(time);
  var date = new Date(unix_timestamp * 1000);
  return moment(date).format('MM/DD/YYYY')
}

export {
  convertUnixTime
}