const yearInput = document.getElementById("yearinput");
const monthInput = document.getElementById("monthinput");

const startYear = new Date().getFullYear();
const endYear = 2037;
const startMonth = new Date().getMonth();

yearInput.value = startYear;
monthInput.value = startMonth;
let year = startYear;
let month = startMonth;

yearInput.addEventListener("change", (event) => {
  year = yearInput.value;
  renderCalendar();
});

monthInput.addEventListener("change", (event) => {
  month = monthInput.value;
  renderCalendar();
});

function renderCalendar() {
  
}

