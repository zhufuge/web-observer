import React from 'react';

import drawChart from '../common/draw';

export default
class MainContent extends React.Component {
  drawCanvas(canvas) {
    if (browser) {
      const getting = browser.storage.local.get();
      getting
        .then(drawChart(canvas))
        .catch(e => console.log(e));
    }
  }
  render() {
    return (
      <div>
        <div style={styles.cvsContainer}>
          <canvas
            ref={this.drawCanvas}
            width="200" height="100"/>
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
