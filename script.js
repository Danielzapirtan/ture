const select = document.getElementById('monthSelect');
const monthNamesRo = [
  "ianuarie", "februarie", "martie", "aprilie",
  "mai", "iunie", "iulie", "august",
  "septembrie", "octombrie",
  "noiembrie", "decembrie"
];
for (let l = 0; l < 12; l++) {
  const monthName = monthNamesRo[l];
  const option = document.createElement('option');
  option.value = l;
  option.textContent = `${monthName}`;
  select.appendChild(option);
}

select.addEventListener('change', updateCalendar);

updateCalendar();

function updateCalendar() {
  const month = select.value;
  const year = 2025;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let tura = 4;
  if (urlParams.has("tura")) {
	  alert("Acest link nu mai exista. Va rugam solicitati un link nou de unde l-ati obtinut pe cel vechi");
  }
  if (urlParams.has("user")) {
    const userValue = urlParams.get("user");
    const users = [ "ljc1q", "xxtoo", "fras0", "l3hb4"];
    for (let user = 0; user < 4; user++) {
      if (users[user] === userValue) {
        tura = user + 1;
      }
      if (tura % 2 === 0) tura = 6 - tura;
    }
  }
  const date1 = new Date(year, month, 1);
  const date0 = new Date(2024, 0, 1);
  let fakeDayOfYear = Math.ceil((date1 - date0) / 86400000);
  let calendarHTML = `<table><tr><th>lun</th><th>mar</th><th>mie</th><th>joi</th><th>vin</th><th>sâm</th><th>dum</th></tr><tr>`;
  let dayCount = 1;
  for (let i = 0; i < 42; i++) {
    if (i >= firstDay && dayCount <= daysInMonth) {
      let dt = (fakeDayOfYear + tura) % 4;
      let doyClass = `doy${dt}`;
      calendarHTML += `<td class="${doyClass}">${dayCount}</td>`;
      fakeDayOfYear++;
      dayCount++;
    } else {
      calendarHTML += `<td></td>`;
    }
    if (i % 7 === 6 && dayCount <= daysInMonth) {
      calendarHTML += `</tr><tr>`;
    }
    if (dayCount > daysInMonth && i % 7 == 6) {
      break;
    }
  }
  calendarHTML += `</tr></table>`;
  document.getElementById("calendarContainer").innerHTML = calendarHTML;
}

