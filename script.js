const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let tura = 0;
if (urlParams.has("tura")) {
	const turaValue = urlParams.get("tura");
	if (
		!isNaN(turaValue) &&
		parseInt(turaValue) >= 1 &&
		parseInt(turaValue) <= 4
	) {
		tura = parseInt(turaValue) % 4;
	}
}

function generateCalendar() {
	const month = document.getElementById('month').value;
	const year = document.getElementById('year').value;
	const daysInMonth = new Date(year, month, 0).getDate();
	const daysRow = document.getElementById('days');
	daysRow.innerHTML = '<th></th>';
	for (let i = 1; i <= daysInMonth; i++) {
		const date = new Date(year, month - 1, i);
		if (date.getDay() === 6 || date.getDay() === 0) {
			daysRow.innerHTML += `<th class="weekend">${i}</th>`;
		}
		else {
			daysRow.innerHTML += `<th>${i}</th>`;
		}
	}
	const calendarBody = document.getElementById('calendarBody');
	calendarBody.innerHTML = '';
	const employees = ['asMR', 'asMC', 'asFR', 'asCC'];
	const shifts = ['Z', 'N', '-', '-'];
	const referenceDate = new Date(2024, 11, 30);
	const monthBegin = new Date(year, month - 1, 1);
	const fakeDayOfYear = parseInt(Math.round((monthBegin - referenceDate) / 86400 / 1000)) % 4;
	for (let shift = 0; shift < 4; shift++) {
		const row = document.createElement('tr');
		if (tura === shift) {
			row.classList.add('myShift');
		}
		row.innerHTML = `<td>${employees[shift]}</td>`;
		for (let day = 1; day <= daysInMonth; day++) {
			const cell = document.createElement('td');
			const shiftIndex = (day + 7 - shift + fakeDayOfYear) % 4;
			cell.innerHTML = shifts[shiftIndex];
			// Apply yellow background to weekends and holidays (for simplicity, considering weekends only here)
			const date = new Date(year, month - 1, day);
			if (date.getDay() === 6 || date.getDay() === 0) {
				cell.classList.add('weekend');
			}
			row.appendChild(cell);
		}
		calendarBody.appendChild(row);
	}
}
// Populate year options dynamically
const currentYear = new Date().getFullYear();
const yearSelect = document.getElementById('year');
for (let i = currentYear; i <= currentYear + 10; i++) {
	const option = document.createElement('option');
	option.value = i;
	option.innerText = i;
	yearSelect.appendChild(option);
}
generateCalendar();
