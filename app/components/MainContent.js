import React from 'react';
import {DatePicker} from 'antd';
import moment from 'moment';

import timesDraw from '../common/times-draw';
import timeDraw from '../common/time-draw';

export default
class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeDateSelect: moment().format('YYYY/M/D')
    };
    this.timeDateChange = this.timeDateChange.bind(this);
  }
  timeDateChange(value, dateString) {
    this.setState({timeDateSelect: dateString});
  }
  renderTimes() {
    return (
      <div style={styles.container}>
        <canvas ref={timesDraw}
                width="200" height="100"/>
      </div>
    );
  }
  renderTime() {
    return (
      <div style={styles.container}>
        <DatePicker
          value={moment(this.state.timeDateSelect)}
          format="YYYY/M/D"
          onChange={this.timeDateChange} />
        <div>{this.state.timeDateSelect}</div>
        <canvas ref={timeDraw}
                width="200" height="100"/>
      </div>
    );
  }

  render() {
    switch(this.props.item) {
    case '1': return this.renderTimes();
    case '2': return this.renderTime();
    default: return this.renderTimes();
    }
  }
}

const styles = {
  container: {
    margin: 30,
    background: '#fff',
    padding: 30,
  }
};
