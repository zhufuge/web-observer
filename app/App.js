import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default
class App extends React.Component {
  render() {
    return (
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer style={{ textAlign: 'center' }}>
            zhufuge ©2017 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
