const yearEl = document.getElementById("year");
const calendarContainer = document.getElementById("calendarcontainer");
const up = document.getElementById("up");
const down = document.getElementById("down");

const startYear = new Date().getFullYear();
const endYear = 2037;

yearEl.value = startYear;
let year = startYear;

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

function renderCalendar() {
  calendarContainer.innerHTML = ``;
  for (let month = 0; month <= 11; month++) {
    const monthCalendar = document.createElement("div");
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    monthCalendar.innerHTML = `${String(month + 101).slice(1)}: `;
    for (let day = 1; day <= daysInMonth; day++)
      if (isWorkDay(year, month, day) > 1) {
	const weekDay = new Date(year, month, day).getDay();
	const bgcolor = weekDay % 6 === 0;
	const color = (isWorkDay(year, month, day) < 3) ? "white" : "black";
	if (!bgcolor)
	      monthCalendar.innerHTML += `<span class="blue ${color}">${day}&nbsp</span>`;
	else if (weekDay === 5)
	      monthCalendar.innerHTML += `<span class="green ${color}">${day}&nbsp</span>`;
	else
	      monthCalendar.innerHTML += `<span class="red ${color}">${day}&nbsp</span>`;
      }
    monthCalendar.innerHTML += `<br/>`;
    calendarContainer.appendChild(monthCalendar);
    }
}

up.addEventListener("click", (event) => {
  event.preventDefault();
  year++;
  if (year > endYear) { 
    year = endYear;
  }
  yearEl.innerHTML = `${year}`;
  renderCalendar();
});

down.addEventListener("click", (event) => {
  event.preventDefault();
  year--;
  if (year < startYear) {
    year = startYear;
  }
  yearEl.innerHTML = `${year}`;
  renderCalendar();
});

renderCalendar();
