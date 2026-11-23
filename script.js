const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const calendarContainer = document.getElementById("calendarcontainer");
const yup = document.getElementById("yup");
const ydown = document.getElementById("ydown");
const mup = document.getElementById("mup");
const mdown = document.getElementById("mdown");

const startYear = new Date().getFullYear();
const startMonth = new Date().getMonth();
const endYear = 2037;

yearEl.value = startYear;
monthEl.value = startMonth;
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
  return ((diffDate + 7 - tura) % 4);
}

function addCell(el, fg, bg, tc) {
  const cell = document.createElement("span");
  cell.classList.add('cell');
  cell.style.color = fg;
  cell.style.backgroundColor = bg;
  cell.innerHTML = tc;
  el.appendChild(cell);
}

function renderCalendar() {
  calendarContainer.innerHTML = ``;
  const head = document.createElement("div");
  head.innerHTML = ``;
  addCell(head, "#222", "#ddd", "Lun");
  addCell(head, "#222", "#ddd", "Mar");
  addCell(head, "#222", "#ddd", "Mie");
  addCell(head, "#222", "#ddd", "Joi");
  addCell(head, "#222", "#ddd", "Vin");
  addCell(head, "#222", "#ddd", "Sam");
  addCell(head, "#222", "#ddd", "Dum");
  head.classList.add("row");
  calendarContainer.appendChild(head);
  for (let week = 0; week < 6; week++) {
    const row = document.createElement("div");
    row.innerHTML = ``;
    for (let wday = 1; wday < 8; wday++) {
      const day = week * 7 + wday;
      addCell(row, "#222", "#eee", `${day}`);
    }
    row.classList.add("row");
    calendarContainer.appendChild(row);
  }
}
/*
function renderCalendar() {
  calendarContainer.innerHTML = ``;
  for (let month = 0; month <= 11; month++) {
    const monthCalendar = document.createElement("div");
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    monthCalendar.innerHTML = `${String(month + 101).slice(1)}: `;
    for (let day = 1; day <= daysInMonth; day++)
      if (isWorkDay(year, month, day) > 1) {
        const day1 = String(day + 100).slice(1);
	const weekDay = new Date(year, month, day).getDay();
	const bgcolor = weekDay % 6 === 0;
	const color = (isWorkDay(year, month, day) < 3) ? "white" : "black";
	if (!bgcolor)
	      monthCalendar.innerHTML += `<span class="blue ${color}">${day1}&nbsp</span>`;
	else if (weekDay === 6)
	      monthCalendar.innerHTML += `<span class="green ${color}">${day1}&nbsp</span>`;
	else
	      monthCalendar.innerHTML += `<span class="red ${color}">${day1}&nbsp</span>`;
      }
    monthCalendar.innerHTML += `<br/>`;
    calendarContainer.appendChild(monthCalendar);
    }
}
*/
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
  if (month > 12) { 
    month = 12;
  }
  monthEl.innerHTML = `${month}`;
  renderCalendar();
});

mdown.addEventListener("click", (event) => {
  event.preventDefault();
  month--;
  if (month < 1) {
    month = 1;
  }
  monthEl.innerHTML = `${month}`;
  renderCalendar();
});

renderCalendar();
