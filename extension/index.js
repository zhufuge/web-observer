const getting = browser.storage.local.get();
getting.then(item => {
  console.log(item);
}).catch(e => console.log(e));
