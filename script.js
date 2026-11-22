const yearInput = document.getElementById("yearinput");
const calendarContainer = document.getElementById("calendarcontainer");

const startYear = new Date().getFullYear();
const endYear = 2037;

yearInput.value = startYear;
let year = startYear;

function getTura() {
  const url = window.location.search;
  const user = url.slice(6, 11);
  const users = [ "ljc1q", "xxtoo", "fras0", "l3hb4", ];
  return (1 + users.indexOf(user));
}

const tura = getTura();

function isWorkDay(year, month, day) {
  const diffDate = Math.round((new Date(year, month, day) - new Date(2026, 0, 0)) / 86400000.0);
  return (((diffDate + 6 - tura) % 4) > 1);
}

function renderCalendar() {
  calendarContainer.innerHTML = ``;
  for (let month = 1; month <= 12; month++) {
    const monthCalendar = document.createElement("div");
    const daysInMonth = new Date(year, month, 0).getDate();
    monthCalendar.innerHTML = `${month}: `;
    for (let day = 1; day <= daysInMonth; day++)
      if (isWorkDay(year, month, day)) {
        monthCalendar.innerHTML += `${day} `;
      }
    monthCalendar.innerHTML += `<br/>`;
    calendarContainer.appendChild(monthCalendar);
  }
}

yearInput.addEventListener("change", (event) => {
  event.preventDefault();
  year = yearInput.value;
  renderCalendar();
});

renderCalendar();
