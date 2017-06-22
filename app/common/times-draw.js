const COLORS = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(54, 162, 235, 0.2)',
];
const BORDER_COLORS = [
  'rgba(255, 99, 132, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(54, 162, 235, 1)',
];

function extractTop(obj, max) {
  const items = [];
  for (let key in obj) {
    items.push([key, obj[key]]);
  }
  items.sort((a, b) => b[1] - a[1]);

  const labels = [], data = [];
  for (let i = 0; i < items.length && i < max; i++) {
    labels.push(items[i][0]);
    data.push(items[i][1]);
  }
  return {labels, data};
}

function getGroupColor(total, colorset) {
  const color = [];
  const len = colorset.length;
  const step = Math.ceil(total / len);
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < step; j++) {
      color.push(colorset[i]);
    }
  }
  return color;
}

function drawChart(canvas) {
  return function(item) {
    const ctx = canvas.getContext('2d'),
          {labels, data} = extractTop(item.url, 12),
          backgroundColor = getGroupColor(data.length, COLORS),
          borderColor = getGroupColor(data.length, BORDER_COLORS);

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'times',
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  };
}

function draw(canvas) {
  if (browser) {
    browser.storage.local.get('url')
      .then(drawChart(canvas))
      .catch(e => console.log(e));
  }
}

module.exports = draw;
