let sundayDayOfWeek = 0;
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

function createMonthYearSelect() {
  const selectElement = document.createElement('select');

  // Get the current date
  const currentDate = new Date();

  // Iterate through the next 18 months
  for (let i = 0; i < 18; i++) {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Create an option for the current month and year
    const option = document.createElement('option');
    option.value = `${year}-${month + 1}`; // Format: YYYY-MM
    option.text = `${new Intl.DateTimeFormat('ro-Ro', { month: 'long', year: 'numeric' }).format(currentDate)}`;

    selectElement.appendChild(option);

    // Increment the date by one month
    currentDate.setMonth(month + 1);
  }

  return selectElement;
}

// Add the select element to your HTML (replace 'your-container-id' with your actual container ID)
const container = document.getElementById('selectContainer');

const monthYearSelect = createMonthYearSelect();
container.appendChild(monthYearSelect);

monthYearSelect.addEventListener('change', () => {
  const selectedValue = monthYearSelect.value;
  [year, month] = selectedValue.split('-');
  month--;
  updateCalendar();
});

updateCalendar();

function updateCalendar() {
	let tura = 4;

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	if (urlParams.has("sabat")) {
		const sabatValue = urlParams.get("sabat");
		if (!isNaN(sabatValue) &&
			parseInt(sabatValue) >= 0 &&
			parseInt(sabatValue) <= 1
		)
			sundayDayOfWeek = parseInt(sabatValue);
	}
	if (urlParams.has("tura")) {
		const turaValue = urlParams.get("tura");
		if (
			!isNaN(turaValue) &&
			parseInt(turaValue) >= 1 &&
			parseInt(turaValue) <= 4
		) {
			tura = parseInt(turaValue);
			if (tura % 2 == 0) tura = 6 - tura;
		}
	}
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	let firstDay = new Date(year, month, 1).getDay() - 1 + sundayDayOfWeek;
	if (firstDay === -1) firstDay = 6;

	const firstDayOfMonthDate = new Date(year, month, sundayDayOfWeek);
	const refDate = new Date(2024, 0, 1);
	let fakeDayOfYear = Math.ceil((firstDayOfMonthDate - refDate) / 86400000);

	let calendarHTML = ``;
	if (sundayDayOfWeek === 1)
		calendarHTML += `<table><tr><th>dum</th><th>lun</th><th>mar</th><th>mie</th><th>joi</th><th>vin</th><th>sâm</th></tr><tr>`;

	else
		calendarHTML += `<table><tr><th>lun</th><th>mar</th><th>mie</th><th>joi</th><th>vin</th><th>sâm</th><th>dum</th></tr><tr>`;
	let dayCount = 1;

	for (let i = 0; i < 42; i++) {
		let fakeDayOfYearClass = `fakeDayOfYear${(fakeDayOfYear + tura + 1 - sundayDayOfWeek) % 4}`;
		if (i >= firstDay && dayCount <= daysInMonth) {
			if (sundayDayOfWeek === 1) {
				if (i % 7 === 5) if ((fakeDayOfYear + tura) % 4 === 3) fakeDayOfYearClass = `fakeDayOfYear2`;
				if (i % 7 === 6) if ((fakeDayOfYear + tura) % 4 === 2) fakeDayOfYearClass = `fakeDayOfYear3`;
			}
			calendarHTML += `<td class="${fakeDayOfYearClass}">${dayCount}</td>`;
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
