const onError = e => console.log(`Error: ${e}`);

(() => {
  function storageDate(dateTime, isStart) {
    const date = dateTime.toLocaleDateString(),
          time = dateTime.toLocaleTimeString('en-GB');

    const storageTime = (item) => {
      const item_date = item[date];
      if (isStart) {
        item_date.push([time]);
      } else {
        item_date[item_date.length - 1].push(time);
      }
      return browser.storage.local.set({[date]: item_date});
    };

    return browser.storage.local.get(date)
      .then(item => item[date]
            ? storageTime(item)
            : browser.storage.local.set({[date]: [[time]]}))
      .catch(onError);
  };

  let number = 0;
  const info = d => console.log(`number:${number} time:${d.toLocaleString()}`);

  browser.windows.onCreated.addListener(() => {
    const start = new Date();
    if (number === 0) storageDate(start, true);
    number++;
    info(start);
  });

  browser.windows.onRemoved.addListener(() => {
    const end = new Date();
    number--;
    info(end);
    if (number === 0) storageDate(end, false);
  });
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
    if (changeInfo.url === void 0) return ;
    const match = HOST_REGEXP.exec(changeInfo.url);
    if (match === null) return ;
    const curHost = match[1];
    if (ignoreHost(curHost)) return ;

    browser.storage.local.get('url')
      .then(item => {
        const url = item.url || {};
        url[curHost] = url[curHost] + 1 || 1;
        return browser.storage.local.set({url});
      })
      .catch(onError);
  });
})();
