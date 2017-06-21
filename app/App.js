import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

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
      <Layout style={{height: '100%'}}>
        <Sider width={260}>
          <SiderContent
            item={this.state.tab}
            onSelected={this.changeTab}/>
        </Sider>
        <Layout>
          <Header style={{background: '#fff'}}></Header>
          <Content>
            <MainContent />
          </Content>
        </Layout>
      </Layout>
    );
  }
}