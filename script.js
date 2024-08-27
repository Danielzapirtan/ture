let year = new Date().getFullYear();
let month = new Date().getMonth();
const monthNames = [
	"ian",
	"feb",
	"mar",
	"apr",
	"mai",
	"iun",
	"iul",
	"aug",
	"sep",
	"oct",
	"noi",
	"dec"
];

function highlight(button) {
	button.classList.add("highlight");
}

function unhiglight(buttons) {
	buttons.forEach(button => {
		button.classList.remove("highlight");
	});
}

updateCalendar();

const monthButtons = document.querySelectorAll('.month-buttons button');
monthButtons.forEach(button => {
	button.addEventListener('click', () => {
	const monthName = button.textContent;
		let ix = 0;
		monthNames.forEach(currMonthName => {
			if (monthName == currMonthName) {
				month = ix;
			}
			ix++;
		});
		unhighlight(monthButtons);
		highlight(button);
		updateCalendar();
	});
});

const yearButtons = document.querySelectorAll('.year-buttons button');
yearButtons.forEach(button => {
	button.addEventListener('click', () => {
		year = parseInt(button.textContent);
		unhighlight(yearButtons);
		highlight(button);
		updateCalendar();
	});
});

function updateCalendar() {
  document.getElementById("monthyear").innerHTML = `luna ${monthNames[month]} anul ${year}`;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	let tura = 4;

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
	const date1 = new Date(year, month, 1);
	const date0 = new Date(2024, 0, 1);
	let doy = Math.ceil((date1 - date0) / 86400000);
	let calendarHTML = `<table><tr><th>lun</th><th>mar</th><th>mie</th><th>joi</th><th>vin</th><th>sâm</th><th>dum</th></tr><tr>`;
	let dayCount = 1;
	for (let i = 0; i < 42; i++) {
		if (i >= firstDay && dayCount <= daysInMonth) {
			let dt = (doy + tura) % 4;
			let doyClass = `doy${dt}`;
			calendarHTML += `<td class="${doyClass}">${dayCount}</td>`;
			doy++;
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
