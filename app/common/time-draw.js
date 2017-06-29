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
  const HALF_DAY = 60 * 60 * 12;

  let isStart0 = [false, false];

  const len = array.length;
  for (let i = 0; i < len; i++) {
    if (array[i].length === 1){
      array.splice(i, 1);
    }
  }

  const data = [[], []];
  let last = 0, temp = 0;
  for (let time of array) {
    for (let i = 0; i < 2; i++) {
      temp = last;
      last = time2Number(time[i]);
      if (last < HALF_DAY) {
        data[0].push(last - temp);
      } else {
        if (temp < HALF_DAY) {
          temp = HALF_DAY;
          if (i === 1) isStart0[1] = true;
        }
        data[1].push(last - temp);
      }
    }
  }

  if (isStart0[0]) data[0].shift();

  for (let i = 0; i < 2; i++) {
    const sum = data[i].reduce((s, v) => s + v, 0);
    if (sum !== HALF_DAY) {
      data[i].push(HALF_DAY - sum);
    }
  }

  return [data[0], data[1], isStart0[0], isStart0[1]];
}

const NOTUSE = '未启用时间',
      USE = '启用时间',
      GRAY = 'rgba(0, 0, 0, 0.1)',
      RED = 'rgba(255, 99, 132, 0.8)',
      YELLOW = 'rgba(255, 206, 86, 0.8)';

function getColors(length, isStart0, i) {
  const colors = [],
        ACTIVE = i === 0 ? RED : YELLOW;
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

function drawDoughnut(c1, c2, date) {
  return function(item) {
    const allData = item.bTime[date];

    const ctx = [
      c1.getContext('2d'),
      c2.getContext('2d')
    ];

    const myChart = [],
          data = [[1], [1]],
          isStart0 = [false, false];

    if (allData !== void 0) {
      [data[0], data[1], isStart0[0], isStart0[1]] = toLineSet(allData);
    }

    for (let i = 0; i < 2; i++) {
      const labels = getLabels(data[i].length, isStart0[i]),
            colors = getColors(data[i].length, isStart0[i], i);

      myChart[i] = new Chart(ctx[i], {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            label: 'times',
            data: data[i],
            backgroundColor: colors,
          }]
        }
      });
    }
  };
}

function timeDraw(c1, c2, date) {
  if (browser) {
    browser.storage.local.get('bTime')
      .then(drawDoughnut(c1, c2, date))
      .catch(e => console.log(e));
  }
}

export default timeDraw;
