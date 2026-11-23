const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const calendarContainer = document.getElementById("calendarcontainer");
const yup = document.getElementById("yup");
const ydown = document.getElementById("ydown");
const mup = document.getElementById("mup");
const mdown = document.getElementById("mdown");

const startYear = new Date().getFullYear();
const startMonth = new Date().getMonth();
const endYear = Math.min(2037, startYear + 3);

yearEl.value = startYear;
monthEl.value = startMonth + 1;
let year = startYear;
let month = startMonth;

function getTura() {
  const url = window.location.search;
  const user = url.slice(6, 11);
  const users = [ "ljc1q", "xxtoo", "fras0", "l3hb4", ];
  return (1 + users.indexOf(user));
}

const tura = getTura();

function isWorkDay(year, month, day) {
  const diffDate = Math.round((new Date(year, month, day) - new Date(2025, 0, 0)) / 86400000.0);
  return ((diffDate + 9 - tura) % 4);
}

function addCell(el, fg, bg, tc) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.color = fg;
  cell.style.backgroundColor = bg;
  cell.innerHTML = `${tc}`;
  el.appendChild(cell);
}

function renderCalendar() {
  calendarContainer.innerHTML = ``;
  const head = document.createElement("div");
  head.classList.add("row");
  head.innerHTML = ``;
  addCell(head, "#222", "#ddd", "Lun");
  addCell(head, "#222", "#ddd", "Mar");
  addCell(head, "#222", "#ddd", "Mie");
  addCell(head, "#222", "#ddd", "Joi");
  addCell(head, "#222", "#ddd", "Vin");
  addCell(head, "#222", "#ddd", "Sam");
  addCell(head, "#222", "#ddd", "Dum");
  calendarContainer.appendChild(head);
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let week = 0; week < 6; week++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = ``;
    for (let wday = 0; wday < 7; wday++) {
      const day = week * 7 + wday - firstDay + 1;
      const wDay = isWorkDay(year, month, day);
      const sc = [ "lightgreen", "lightblue", "lightyellow", "lightyellow", ];
      const bg = sc[wDay];
      let fg;
      if (wday > 4)
	    fg = "red";
      else
	    fg = "#111";
      if (day < 1 || day > daysInMonth)
	    addCell(row, "#222", "#fff", ``);
      else
        addCell(row, fg, bg, `${day}`);
    }
    calendarContainer.appendChild(row);
    const day = week * 7 + 7 - firstDay;
    if (day >= daysInMonth)
      break;
  }
}

yup.addEventListener("click", (event) => {
  event.preventDefault();
  year++;
  if (year > endYear) { 
    year = endYear;
  }
  yearEl.innerHTML = `${year}`;
  renderCalendar();
});

ydown.addEventListener("click", (event) => {
  event.preventDefault();
  year--;
  if (year < startYear) {
    year = startYear;
  }
  yearEl.innerHTML = `${year}`;
  renderCalendar();
});

mup.addEventListener("click", (event) => {
  event.preventDefault();
  month++;
  if (month > 11) { 
    month = 0;
    year++;
    if (year > endYear) {
      year = endYear;
      month = 11;
    }
  }
  monthEl.innerHTML = `${month + 1}`;
  yearEl.innerHTML = `${year}`;
  renderCalendar();
});

mdown.addEventListener("click", (event) => {
  event.preventDefault();
  month--;
  if (month < 0) {
    month = 11;
    year--;
    if (year < startYear) {
      year = startYear;
      month = 0;
    }
  }
  monthEl.innerHTML = `${month + 1}`;
  yearEl.innerHTML = `${year}`;
  renderCalendar();
});

renderCalendar();
