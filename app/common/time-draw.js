function extractDate(item) {
  const DATE_REGEXP = /^\d{4}(?:\\\d{1,2}){2}$/;
  const all = {};
  for (let v in item) {
    if (DATE_REGEXP.exec(v)) {
      all[v] = item[v];
    }
  }

  return all;
}

function time2Number(time) {
  const sub = (a, b) => time.substr(a, b);
  return parseInt(sub(0, 2)) * 60 * 60 +
    parseInt(sub(3, 2)) * 60 +
    parseInt(sub(6, 2));
}

function toLineSet(array) {
  const DAY = 60 * 60 * 24 - 1;
  const data = [];

  let last = 0, temp = 0;
  for (let time of array) {
    if (!data) {
      if (time.length === 1) {
        last = time2Number(time[0]);
        data.push(last);
      } else {
        temp = time2Number(time[0]);
        last = time2Number(time[1]);
        data.push(temp);
        data.push(last - temp);
      }
    } else {
      for (let i = 0; i < 2; i++) {
        temp = last;
        last = time2Number(time[i]);
        data.push(last - temp);
      }
    }
  }

  data.push(DAY - last);

  return data;
}

const NOTUSE = '未启用时间',
      USE = '启用时间',
      GRAY = 'rgba(0, 0, 0, 0.1)',
      ACTIVE = 'rgba(255, 99, 132, 0.8)';

function getColors(length, isStart0) {
  const colors = [];
  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      colors.push(isStart0 ? ACTIVE : GRAY);
    } else {
      colors.push(isStart0 ? GRAY : ACTIVE);
    }
  }

  return colors;
}

function getLabels(length, isStart0) {
  const labels = [];
  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      labels.push(isStart0 ? USE : NOTUSE);
    } else {
      labels.push(isStart0 ? NOTUSE : USE);
    }
  }

  return labels;
}

function drawChart(canvas, date) {
  return function(item) {
    const ctx = canvas.getContext('2d');
    let myChart;
    if (Object.keys(item).length !== 0) {
      const data = toLineSet(item[date]),
            isStart0 = item[date][0].length === 1,
            labels = getLabels(data.length,isStart0),
            colors = getColors(data.length, isStart0);
      myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            label: 'times',
            data,
            backgroundColor: colors,
          }]
        }
      });
    } else {
      myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['未启用时间'],
          datasets: [{
            label: 'times',
            data: [1],
          }]
        }
      });
    }
  };
}

function timeDraw(canvas, date) {
  if (browser) {
    browser.storage.local.get(date)
      .then(drawChart(canvas, date))
      .catch(e => console.log(e));
  }
}

export default timeDraw;
