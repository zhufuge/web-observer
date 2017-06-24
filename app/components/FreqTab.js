import React from 'react';
import { Card } from 'antd';

import freqDraw from '../common/freq-draw';

export default
class FreqTab extends React.Component {
  render() {
    return (
      <Card>
        <canvas ref={freqDraw} width="200" height="100"/>
      </Card>
    );
  }
}
