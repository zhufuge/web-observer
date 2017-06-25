import React from 'react';
import { Card } from 'antd';

import visitDraw from '../common/visit-draw';

export default
class FreqTab extends React.Component {
  render() {
    return (
      <Card title="访问次数最多的网站">
        <canvas ref={visitDraw} width="100" height="60"/>
      </Card>
    );
  }
}
