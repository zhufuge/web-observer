import React from 'react';
import { Layout } from 'antd';
const { Sider, Content } = Layout;

import SiderContent from './SiderContent';
import VisitItem from './VisitItem';
import TimeItem from './TimeItem';

export default
class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: '1'
    };
    this.changeTab = this.changeTab.bind(this);
  }
  changeTab(tab) {
    this.setState({tab});
  }
  render() {
    const tab = this.state.tab === '1' ? <VisitItem /> : <TimeItem />;
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={240}
          style={{ background: '#fff' }}>
          <SiderContent
            tab={this.state.tab}
            onSelected={this.changeTab}/>
        </Sider>
        <Content style={{ overflow: 'hidden' }}>
          <div style={styles.container}>
            {tab}
          </div>
        </Content>
      </Layout>
    );
  }
}

const styles = {
  container: {
    background: '#fff',
    padding: 30,
    width: '100%',
  },
};
