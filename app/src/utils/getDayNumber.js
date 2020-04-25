let getDayNumber = (date) => {
  let now = new Date(date);
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  //console.log('Day of year: ' + day);

  return day
}

export {
  getDayNumber
}