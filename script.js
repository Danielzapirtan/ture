const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const calendarContainer = document.getElementById("calendarcontainer");
const yup = document.getElementById("yup");
const ydown = document.getElementById("ydown");
const mup = document.getElementById("mup");
const mdown = document.getElementById("mdown");

const nowDate = Temporal.Now.plainDateISO();

yearEl.value = nowDate.year;
monthEl.value = nowDate.month;

function getTura() {
  const url = window.location.search;
  const user = url.slice(6, 11);
  const users = [ "ljc1q", "xxtoo", "fras0", "l3hb4", ];
  return (1 + users.indexOf(user));
}

const tura = getTura();

function isWorkDay(date) {
  const refDate = Temporal.PlainDate.from({ year: 2025, month: 1, day: 1});
  const diffDate = date.since(refDate);
  if (diffDate.years > 0)
    return date.subtract({days: 364}).since(refDate);
  if (diffDate.months > 0)
    return date.subtract({days: 28}).since(refDate);
  if (diffDate.days > 0)
    return (diffDate.days + 6 - tura) % 4;
  return 0;
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
  const year = yearEl.innerHTML;
  const month = monthEl.innerHTML;
  calendarContainer.innerHTML = ``;
  const head = document.createElement("div");
  head.classList.add("row");
  head.innerHTML = ``;
  addCell(head, "#222", "#ddd", "lun");
  addCell(head, "#222", "#ddd", "mar");
  addCell(head, "#222", "#ddd", "mie");
  addCell(head, "#222", "#ddd", "joi");
  addCell(head, "#222", "#ddd", "vin");
  addCell(head, "#222", "#ddd", "sam");
  addCell(head, "#222", "#ddd", "dum");
  calendarContainer.appendChild(head);
  const std = Temporal.PlainDate.from({year: year, month: month, day:1});
  const firstDay = (std.dayOfWeek + 6) % 7;
  const daysInMonth = std.daysInMonth;
  for (let week = 0; week < 6; week++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = ``;
    for (let wday = 0; wday < 7; wday++) {
      const day = week * 7 + wday - firstDay + 1;
      let wDay = 3;
      if (day >= 1 && day <= daysInMonth) {
        const then1 = Temporal.PlainDate.from({year: year, month: month, day: day});
        wDay = isWorkDay(then1);
      }
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
  let year = yearEl.innerHTML;
  year++;
  yearEl.innerHTML = `${year}`;
  renderCalendar();
});

ydown.addEventListener("click", (event) => {
  event.preventDefault();
  let year = yearEl.innerHTML;
  year--;
  if (year < 2026)
    year = 2026;
  yearEl.innerHTML = `${year}`;
  renderCalendar();
});

mup.addEventListener("click", (event) => {
  event.preventDefault();
  let month = monthEl.innerHTML;
  let year = yearEl.innerHTML;
  month++;
  if (month > 12) { 
    month = 1;
    year++;
  }
  monthEl.innerHTML = `${month}`;
  yearEl.innerHTML = `${year}`;
  renderCalendar();
});

mdown.addEventListener("click", (event) => {
  event.preventDefault();
  let month = monthEl.innerHTML;
  let year = yearEl.innerHTML;
  month--;
  if (month < 1) {
    month = 12;
    year--;
    if (year < 2026) {
      year = 2026;
      month = 1;
    }
  }
  monthEl.innerHTML = `${month}`;
  yearEl.innerHTML = `${year}`;
  renderCalendar();
});

renderCalendar();
