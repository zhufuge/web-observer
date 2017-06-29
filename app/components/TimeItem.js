import React from 'react';
import { DatePicker, Card, Col, Row } from 'antd';
import moment from 'moment';

import timeDraw from '../common/time-draw';

export default
class TimeTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(new Date()).format('YYYY/M/D')
    };
  }

  componentDidMount() {
    if (this.refs['c2']) {
      const { c1, c2 } = this.refs;
      timeDraw(c1, c2, this.state.date);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.date != this.state.date) {
      const { c1, c2 } = this.refs;
      timeDraw(c1, c2, this.state.date);
    }
  }

  render() {
    const datePicker = (
      <div>
        <span>选择查询的日期&nbsp;:&nbsp;</span>
        <DatePicker
          allowClear={false}
          size="large"
          value={moment(this.state.date)}
          format="YYYY/M/D"
          onChange={(v, date) => date ? this.setState({date}) : 0}
          disabledDate={cur => moment(new Date()) <= cur} />
      </div>
    );
    return (
      <div>
        <Card style={styles.card} title={datePicker}>
          <Row>
            <Col span={12}>
              <canvas ref="c1" width="100" height="75"/>
              <div style={styles.title}>上午</div>
            </Col>
            <Col span={12}>
              <canvas ref="c2" width="100" height="75"/>
              <div style={styles.title}>下午</div>
            </Col>
          </Row>
        </Card>
        <Card style={styles.card} title="一周情况">
        </Card>
      </div>
    );
  }
}

const styles = {
  card: {
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: 20,
    marginTop: 20,
  },
};
