const holidays = [1, 6, 7, 13, 14, 20, 21, 25, 26, 27, 28];
const days = [4, 8, 12, 16, 20, 24, 28];
const nights = [1, 5, 9, 13, 17, 21, 25, 29];
const daysInDecember = 31;
const targetHours = 164;

for (let opt = 1; opt <= 31; opt++) {
  let best = [-Infinity, -Infinity];
  let bestChoice = [-1, -1];
  for (let startDay = 1; startDay <= daysInDecember - 1; startDay++)
    for (let endDay = startDay + 1; endDay <= daysInDecember; endDay++) {
      let score = [0, 0];
      const leaves = [];
      for (let day = startDay; day <= endDay; day++) {
        leaves.push(day);
      }
      score[1] = leaves.length;
      let countHours = 0;
      for (let day = 1; day <= daysInDecember; day++) {
        if ((days.includes(day) || nights.includes(day)) && !leaves.includes(day))
          countHours += 12;
        else if (!holidays.includes(day) && leaves.includes(day))
          countHours += 8;
      }
      if (countHours === targetHours) {
        for (let day = 1; day <= daysInDecember; day++) {
          if (holidays.includes(day) && (days.includes(day) || nights.includes(day)) &&  !leaves.includes(day)) {
            score[0] += 1;
          }
        }
      }
      if (leaves.length != opt)
        score = [0, 0];
      if (score[0] > best[0] || (score[0] === best[0] && (score[1] > best[1]))) {
        best[0] = score[0];
        best[1] = score[1];
        bestChoice[0] = startDay;
        bestChoice[1] = endDay;
      }
    }
  console.log(JSON.stringify({ opt, best, bestChoice}));
}

