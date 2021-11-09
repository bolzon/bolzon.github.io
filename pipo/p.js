function calcAge(from) {
  var born = new Date(2018, 5, 10);
  var diff = from - born;
  var daysDiff = diff / (1000 * 3600 * 24);
  var years = parseInt(daysDiff / 365);
  var remainingDays = daysDiff % 365;
  var months = parseInt(remainingDays / 30);
  return { years: years, months: months };
}

function setAge(age) {
  document.getElementById('age').innerHTML = age;
}

window.onload = function() {
  var res = calcAge(new Date());
  if (res.months) {
    setAge(res.years + 'y ' + res.months + 'm');
  } else {
    setAge(res.years + 'y');
  }
}
