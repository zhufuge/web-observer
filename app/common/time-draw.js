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

function drawChart(canvas) {
  return function(item) {
    const all = extractDate(item);
  };
}

function timeDraw(canvas) {
  if (browser) {
    browser.storage.local.get()
      .then(drawChart(canvas))
      .catch(e => console.log(e));
  }
}

export default timeDraw;
