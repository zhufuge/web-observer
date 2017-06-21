(() => {
  const getting = browser.storage.local.get();
  getting
    .then(drawChart)
    .catch(e => console.log(e));

  function appendCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    canvas.width = 200;
    canvas.height = 100;
    document.getElementById('root').appendChild(canvas);
    return canvas;
  }

  function getDozenData(obj, max) {
    const items = [];
    for (let key in obj) {
      items.push([key, obj[key]]);
    }
    items.sort((a, b) => b[1] - a[1]);

    const labels = [],
          data = [];
    for (let i = 0; i < items.length && i < max; i++) {
      labels.push(items[i][0]);
      data.push(items[i][1]);
    }
    return {labels, data};
  }

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

  function drawChart(obj) {
    const ctx = appendCanvas().getContext('2d'),
          {labels, data} = getDozenData(obj, 12),
          backgroundColor = getGroupColor(data.length, COLORS),
          borderColor = getGroupColor(data.length, BORDER_COLORS);

    console.log(backgroundColor);
    console.log(borderColor);
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
  }
})();
