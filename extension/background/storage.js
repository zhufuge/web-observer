const bsl = browser.storage.local;
const onError = e => console.log(`Error: ${e}`);

(() => {
  const ITEMS = ['bTime', 'url'];
  bsl.get()
    .then(item => {
      for (let i of ITEMS) {
        if (item[i] === void 0) {
          item[i] = {};
        }
      }
      return bsl.set(item);
    })
    .catch(onError);
})();

(() => {

  let open_date;

  function storage(fn) {
    return bsl.get('bTime')
      .then(fn)
      .catch(onError);
  }

  function start(item) {
    const now = new Date(),
          date = now.toLocaleDateString(),
          time = now.toLocaleTimeString('en-GB');

    open_date = date;

    const bTime = item.bTime;
    bTime[date] = bTime[date] || [];
    bTime[date].push([time, time]);
    return bsl.set({bTime});
  }

  storage(start);

  function end(item) {
    const bTime = item.bTime;
    const now = new Date(),
          date = now.toLocaleDateString(),
          time = now.toLocaleTimeString('en-GB');

    if (date === open_date) {
      const bTimeE = bTime[date];
      bTimeE[bTimeE.length - 1][1] = time;
    } else {
      const bTimeS = bTime[open_date];
      bTimeS[bTimeS.length - 1][1] = '23:59:59';
      bTime[date] = [['00:00:00', time]];
      open_date = date;
    }
    return bsl.set({bTime});
  }

  const INTERVAL = 1000 * 60 * 1;
  setInterval(storage(end), INTERVAL);
})();

(() => {
  // for URL
  const ignore = [
    "localhost"
  ];

  const HOST_REGEXP = /^(?:https|http):\/\/([^\/]+)\/*/;

  function ignoreHost(host) {
    for (let item of ignore) {
      if (host.includes(item)) return ture;
    }
    return false;
  }

  browser.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
    if (changeInfo.status !== 'complete') return ;

    const match = HOST_REGEXP.exec(tabInfo.url);
    if (match === null) return ;

    const curHost = match[1];
    if (ignoreHost(curHost)) return ;

    bsl.get('url')
      .then(item => {
        const url = item.url;
        url[curHost] = url[curHost] || {};

        const hostObj = url[curHost];
        hostObj.times = hostObj.times + 1 || 1;

        return bsl.set({url});
      })
      .catch(onError);
  });
})();
