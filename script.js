const select = document.getElementById('monthYearSelect');
const now = new Date();
const monthNamesRo = [
	"Ianuarie", "Februarie",
	"Martie", "Aprilie",
	"Mai", "Iunie",
	"Iulie", "August",
	"Septembrie", "Octombrie",
	"Noiembrie", "Decembrie"
];
for (let l = 0; l < 18; l++) {
  const futureDate = new Date(now);
  futureDate.setMonth(now.getMonth() + l);
  const month = futureDate.getMonth();
  const year = futureDate.getFullYear();
  const monthName = monthNamesRo[month];
  const option = document.createElement('option');
  option.value = l;
  option.textContent = `${monthName} ${year}`;
  select.appendChild(option);
}

select.addEventListener('change', updateCalendar);

updateCalendar();

function updateCalendar() {
  const l = select.value;
  const futureDate = new Date(now);
  futureDate.setMonth(futureDate.getMonth() + l);
  const year = futureDate.getFullYear();
  const month = futureDate.getMonth() + 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let tura = 4;

  if (urlParams.has("tura")) {
    const turaValue = urlParams.get("tura");
    if (
      !isNaN(turaValue) &&
      parseInt(turaValue) >= 1 &&
      parseInt(turaValue) <= 4
    ) {
      tura = parseInt(turaValue);
      if (tura % 2 === 0) tura = 6 - tura;
    }
  }
  const date1 = new Date(year, month, 1);
  const date0 = new Date(2024, 0, 1);
  let doy = Math.ceil((date1 - date0) / 86400000);
  let calendarHTML = `<table><tr><th>lun</th><th>mar</th><th>mie</th><th>joi</th><th>vin</th><th>sâm</th><th>dum</th></tr><tr>`;
  let dayCount = 1;
  for (let i = 0; i < 42; i++) {
    if (i >= firstDay && dayCount <= daysInMonth) {
      let dt = (doy + tura) % 4;
      let doyClass = `doy${dt}`;
      calendarHTML += `<td class="${doyClass}">${dayCount}</td>`;
      doy++;
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

