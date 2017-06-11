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

  const HOST_REGEXP = /:\/\/([^\/]+)\//;
  const onError = e => console.log(e);

  function handleUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.url) {
      const curHost = HOST_REGEXP.exec(changeInfo.url)[1];
      console.log(curHost);

      const getting = browser.storage.local.get(curHost);
      console.log(getting);
      getting
        .catch(onError)
        .then(item => {
          const times = item[curHost] || 0;
          return browser.storage.local.set({[curHost]: times + 1});
        })
        .catch(onError);
    }
  }

  browser.tabs.onUpdated.addListener(handleUpdated);

  function handleRemoved(tabId, removeInfo) {
    const curTime = new Date();
    console.log(curTime);
  }

  browser.tabs.onRemoved.addListener(handleRemoved);
})();
