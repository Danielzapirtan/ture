const select = document.getElementById('monthYearSelect');
const monthNamesRo = [
	"Ianuarie", "Februarie", "Martie", "Aprilie",
	"Mai", "Iunie", "Iulie", "August",
	"Septembrie", "Octombrie",
	"Noiembrie", "Decembrie"
];
for (let l = 0; l < 18; l++) {
  let futureDate = new Date();
  let month = futureDate.getMonth();
  let year = futureDate.getFullYear();
  futureDate = new Date(year, month + l, 1);
  month = futureDate.getMonth();
  year = futureDate.getFullYear();
  const monthName = monthNamesRo[month];
  const option = document.createElement('option');
  option.value = year * 100 + month;
  option.textContent = `${monthName} ${year}`;
  select.appendChild(option);
}

select.addEventListener('change', updateCalendar);

updateCalendar();

function updateCalendar() {
  const yearmonth = select.value;
  const year = parseInt(yearmonth.slice(0,4));
  const month = parseInt(yearmonth.slice(4));
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let tura = 4;
  if (urlParams.has("user")) {
    const userValue = urlParams.get("user");
    const users = [ "ljc1q", "xxtoo", "fras0", "l3hb4"];
    for (let user = 0; user < 4; user++) {
      if (users[user] === userValue) {
	      tura = user + 1;
      }
      if (tura % 2 === 0) tura = 6 - tura;
    }
  } else {
    alert('Acest link nu mai exista. Va rog solicitati un alt link in schimb, de unde l-ati obtinut pe cel anterior');
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

