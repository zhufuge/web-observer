import React from 'react';
import { Card } from 'antd';

import visitDraw from '../common/visit-draw';

export default
class FreqTab extends React.Component {
  render() {
    return (
      <div>
        <Card style={styles.card} title="访问次数 TOP10">
          <canvas ref={visitDraw} width="100" height="60"/>
        </Card>
        <Card style={styles.card} title="访问时间 TOP10">
        </Card>
      </div>
    );
  }
}

const styles = {
  card: {
    marginBottom: 20,
  }
};
