import React from 'react';

import draw from '../common/draw';

function dateChunk(div) {
  if (browser) {
    browser.storage.local.get()
      .then(item => {
        let s = '';
        for (let i in item) {
          if (!s) s += i;
          s += ' || ' + i + ':' + item[i];
        }
        div.innerHTML = s;
      })
      .catch(e => console.log(e));
  }
}

export default
class MainContent extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.cvsContainer}>
          <canvas
            ref={draw}
            width="200" height="100"/>
        </div>
        <div ref={dateChunk}>
        </div>
      </div>
    );
  }
}

const styles = {
  cvsContainer: {
    margin: 30,
    background: '#fff',
    padding: 30,
  }
};
