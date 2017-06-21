(() => {
  // listen browser_action
  function openPage() {
    browser.tabs.create({
      url: "index.html"
    });
  }

  browser.browserAction.onClicked.addListener(openPage);
})();

(() => {
  // url storage
  const ignore = [
    "localhost"
  ];

  const HOST_REGEXP = /^(?:https|http):\/\/([^\/]+)\/*/;
  const onError = e => console.log(e);

  function ignoreHost(host) {
    for (let item of ignore) {
      if (host.includes(item)) return ture;
    }
    return false;
  }

  function handleUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.url === void 0) return ;
    const match = HOST_REGEXP.exec(changeInfo.url);
    if (match === null) return ;
    const curHost = match[1];
    if (ignoreHost(curHost)) return ;
    const getting = browser.storage.local.get(curHost);

    getting
      .catch(onError)
      .then(item => {
        const times = item[curHost] || 0;
        return browser.storage.local.set({[curHost]: times + 1});
      })
      .catch(onError);
  }

  browser.tabs.onUpdated.addListener(handleUpdated);
})();
