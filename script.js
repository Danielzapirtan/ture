const yearInput = document.getElementById("yearinput");
const calendarContainer = document.getElementById("calendarcontainer");

const startYear = new Date().getFullYear();
const endYear = 2037;

yearInput.value = startYear;
let year = startYear;

const tura = 1;

yearInput.addEventListener("change", (event) => {
  year = yearInput.value;
  renderCalendar();
});

function isWorkDay(year, month, day) {
  const diffDate = Math.round((new Date(year, month, day) - new Date(2026, 0, 0)) / 86400000.0);
  return ((diffDate % 4) > 1);
}

function renderCalendar() {
  for (let month = 1; month <= 12; month++) {
    const monthCalendar = document.createElement("div");
    const daysInMonth = new Date(year, month, 0).getDate();
    monthCalendar.innerHTML = ``;
    for (let day = 1; day <= daysInMonth; day++)
      if (isWorkDay(year, month, day)) {
        monthCalendar.innerHTML += `${day} `;
      }
    monthCalendar += `<br/>`;
    calendarContainer.appendChild(monthCalendar);
  }
}

