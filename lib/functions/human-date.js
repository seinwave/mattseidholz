const MONTHS = {
  01: "Jan",
  1: "Jan",
  02: "Feb",
  2: "Feb",
  03: "Mar",
  3: "Mar",
  04: "Apr",
  4: "Apr",
  05: "May",
  5: "May",
  06: "Jun",
  6: "Jun",
  07: "Jul",
  7: "Jul",
  08: "Aug",
  8: "Aug",
  09: "Sep",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

function humanDateStripper(date) {
  let month = date.match(/^\d\d/g)[0];
  let humanMonth = MONTHS[month];

  let humanYear = date.match(/\d\d\d\d/g)[0];
  let humanDay = date.match(/\d\d/)[1];

  return { humanMonth, humanYear, humanDay };
}
