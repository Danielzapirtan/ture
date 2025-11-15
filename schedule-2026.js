const https = require('https');

// Function to get Romanian public holidays for 2026
function getRomanianHolidays(month1) {
  return new Promise((resolve, reject) => {
    const url = 'https://date.nager.at/api/v3/PublicHolidays/2026/RO';
    
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const holidays = JSON.parse(data);
          const holidayDates = holidays.map(holiday => {
            const date = new Date(holiday.date);
            if (date.getMonth() === month1 - 1)
              return date.getDate(); // Extract day of month
          }).filter(day => day !== undefined); // Filter out undefined values
          resolve(holidayDates);
        } catch (error) {
          reject(error);
        }
      });
      
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function main() {
  const refDate = new Date(2026, 0, 0); 
  // Process each month of 2026
  for (let month = 1; month <= 12; month++) {
    console.log(`\n=== Processing month ${month} ===`);
    let holidays;
    try {
      holidays = await getRomanianHolidays(month);
      console.log('Romanian holidays 2026:', month, holidays);
    } catch (error) {
      console.error('Error fetching holidays, using fallback:', error.message);
      // Fallback to known Romanian holidays for 2026
      holidays = [1, 2, 24, 25, 26, 27]; // Jan 1, Jan 2, Apr 24, Apr 25, Apr 26, Apr 27
    }
    
    const daysInMonth = new Date(2026, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      if ((new Date(2026, month - 1, day).getDay() % 6) === 0) {
        if (!holidays.includes(day)) {
          holidays.push(day);
        }
      }
    }
    holidays.sort((a, b) => a - b);
    const targetHours = 164;
    let max = 0;
    let mbest = [-Infinity, -Infinity];
    let mbestChoice = [-1, -1];
    let mopt = -1;
    for (let opt = 1; opt <= daysInMonth; opt++) {
      let best = [-Infinity, -Infinity];
      let bestChoice = [-1, -1];
      
      for (let startDay = 1; startDay <= daysInMonth - 1; startDay++) {
        for (let endDay = startDay + 1; endDay <= daysInMonth; endDay++) {
          let score = [0, 0];
          const leaves = [];
          
          for (let day = startDay; day <= endDay; day++) {
            leaves.push(day);
          }
          
          score[1] = leaves.length;
          let countHours = 0;
          
          for (let day = 1; day <= daysInMonth; day++) {
            const date1 = new Date(2026, month - 1, day);
            const ecart = Math.round((date1 - refDate) / 86400000);
            if (((ecart % 4) < 2) && !leaves.includes(day)) {
              countHours += 12;
            } else if (!holidays.includes(day) && leaves.includes(day)) {
              countHours += 8;
            }
          }
          
          if (countHours === targetHours) {
            for (let day = 1; day <= daysInMonth; day++) {
              const date1 = new Date(2026, month - 1, day); // Fixed: month - 1 instead of month
              const ecart = Math.round((date1 - refDate) / 86400000);
              if (holidays.includes(day) && ((ecart % 4) < 2) && !leaves.includes(day)) {
                score[0] += 1;
              }
            }
          }
          
          if (leaves.length !== opt) {
            score = [0, 0];
          }
          
          if (score[0] > best[0] || (score[0] === best[0] && (score[1] > best[1]))) {
            best[0] = score[0];
            best[1] = score[1];
            bestChoice[0] = startDay;
            bestChoice[1] = endDay;
          }
        }
      }
      if (best[0] > max) {
        max = best[0];
        mbest[0] = best[0];
        mbest[1] = best[1];
        mbestChoice[0] = bestChoice[0]; // Fixed: should be bestChoice[0] not bestChoice[1]
        mbestChoice[1] = bestChoice[1]; // Fixed: add the second element
        mopt = opt;
      }
    }
    console.log(JSON.stringify({ month, mopt, mbest, mbestChoice }));
  }
}

main().catch(console.error);