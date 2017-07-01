const COLORS = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(54, 162, 235, 0.2)',
]
const BORDER_COLORS = [
  'rgba(255, 99, 132, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(54, 162, 235, 1)',
]

function extractTop(obj, max) {
  const items = []
  for (let key in obj) {
    items.push([key, obj[key]])
  }
  items.sort((a, b) => b[1].times - a[1].times)

  const labels = [], data = []
  for (let item of items) {
    if (data.length === max) break;
    labels.push(item[0])
    data.push(item[1].times);
  }
  return {labels, data}
}

function getGroupColor(total, colorset) {
  const color = [],
        len = colorset.length,
        step = Math.ceil(total / len)
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < step; j++) {
      color.push(colorset[i]);
    }
  }
  return color
}

function drawChart(canvas) {
  return !canvas ? {} : function(item) {
    const ctx = canvas.getContext('2d'),
          { labels, data } = extractTop(item.url, 10),
          backgroundColor = getGroupColor(data.length, COLORS),
          borderColor = getGroupColor(data.length, BORDER_COLORS)

    const myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels,
        datasets: [{
          label: 'times',
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero:true,
            }
          }]
        }
      }
    })
  }
}

function visitDraw(canvas) {
  if (typeof browser !== 'undefined') {
    browser.storage.local.get('url')
      .then(drawChart(canvas))
      .catch(e => console.log(e))
  }
}

export default visitDraw
