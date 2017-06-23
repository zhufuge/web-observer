import React from 'react';
import { DatePicker, Card } from 'antd';
import moment from 'moment';

import freqDraw from '../common/freq-draw';
import timeDraw from '../common/time-draw';

export default
class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY/M/D')
    };
  }

  renderFreq() {
    return (
      <div style={styles.container}>
        <canvas ref={freqDraw} width="200" height="100"/>
      </div>
    );
  }
  renderTime() {
    const datePicker = (
      <div>
        <span>选择查询的日期&nbsp;:&nbsp;</span>
        <DatePicker
          allowClear={false}
          size="large"
          value={moment(this.state.date)}
          format="YYYY/M/D"
          onChange={(v, date) => date ? this.setState({date}) : 0}
          disabledDate={cur => moment() <= cur}
          />
      </div>
    );
    return (
      <div style={styles.container}>
        <Card title={datePicker}>
          <canvas
            ref={ref => timeDraw(ref, this.state.date)}
            width="200" height="80"/>
        </Card>
      </div>
    );
  }

  render() {
    switch(this.props.item) {
    case '1': return this.renderFreq();
    case '2': return this.renderTime();
    default: return this.renderFreq();
    }
  }
}

const styles = {
  container: {
    margin: 30,
    background: '#fff',
    padding: 30,
    borderRadius: 3,
  },
};
