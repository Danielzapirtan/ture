const yearSelector = document.getElementById("yearSelector");
const minYear = new Date().getFullYear();
const maxYear = minYear + 13;
yearSelector.value = minYear;
yearSelector.min = minYear;
yearSelector.max = maxYear;
yearSelector.step = 1;
const monthSelector = document.getElementById("monthSelector");
monthSelector.value = new Date().getMonth() + 1;
monthSelector.min = 1;
monthSelector.max = 12;
monthSelector.step = 1;
let year = yearSelector.value;
let month = monthSelector.value;
generateCalendar();

function generateCalendar() {
  year = yearSelector.value;
  month = monthSelector.value - 1;
  if (year === "" || month === "")
    return;
  if (parseInt(year) < 2024 || parseInt(year) > 2037) {
    year = new Date().getFullYear();
    yearSelector.value = year;
  }
  if (parseInt(month) + 1 < 1 || parseInt(month) + 1 > 12) {
    month = new Date().getMonth();
    monthSelector.value = month + 1;
  }
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let tura = null;

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
  var date1 = new Date(year, month, 1);
  var date0 = new Date(2024, 0, 1);
  var doy = Math.ceil((date1 - date0) / 86400000);
  let calendarHTML =
    "<table><tr><th>lun</th><th>mar</th><th>mie</th><th>joi</th><th>vin</th><th>sâm</th><th>dum</th></tr><tr>";
  let dayCount = 1;
  for (let i = 0; i < 42; i++) {
    if (i >= firstDay && dayCount <= daysInMonth) {
      let dt = (doy + tura) % 4;
      let doyClass = `doy${dt}`;
      calendarHTML += `<td class="${doyClass}">${dayCount}</td>`;
      doy++;
      dayCount++;
    } else {
      calendarHTML += "<td></td>";
    }

    if (i % 7 === 6 && dayCount <= daysInMonth) {
      calendarHTML += "</tr><tr>";
    }

    if (dayCount > daysInMonth && i % 7 == 6) {
      break;
    }
  }

  calendarHTML += "</tr></table>";
  document.getElementById("calendarContainer").innerHTML = calendarHTML;
}
