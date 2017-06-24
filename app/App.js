import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import moment from 'moment';

import SiderContent from './components/SiderContent';
import MainContent from './components/MainContent';

export default
class App extends React.Component {
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
    return (
      <Layout style={{ height: '100%' }}>
        <Header style={{ background: '#fff' }}></Header>
        <Content style={{ padding: '20px 50px' }}>
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
              <MainContent tab={this.state.tab}/>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          zhufuge ©2017
        </Footer>
      </Layout>
    );
  }
}
