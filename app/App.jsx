import React from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Footer, Sider, Content } = Layout

import Display from './components/Display.jsx'

export default
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'display',
    }
    this.changeTab = this.changeTab.bind(this)
  }
  changeTab(e) {
    this.setState({tab: e.key})
  }
  render() {
    const content = this.state.tab === 'display' ? <Display /> : <div>setting</div>
    return (
      <Layout style={{ height: '100%' }}>
        <header style={styles.header}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Icon type="eye" style={styles.eyeIcon}/>
            <div style={styles.title}>Web Observer</div>
          </div>
          <Menu
            style={{ position: 'absolut', bottom: 0 }}
            onClick={this.changeTab}
            selectedKeys={[this.state.tab]}
            mode="horizontal">
            <Menu.Item key="display" style={styles.item}>统计</Menu.Item>
            <Menu.Item key="setting" style={styles.item}>设置</Menu.Item>
          </Menu>
        </header>
        <Content style={{ padding: '20px 50px' }}>
          {content}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          zhufuge ©2017
        </Footer>
      </Layout>
    );
  }
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    minHeight: 64,
    padding: '0 100px',
    background: '#fff',
  },
  eyeIcon: {
    fontSize: 48,
    color: '#999',
  },
  title: {
    margin: '0 0 8px 8px',
    color: '#999',
    fontSize: 24,
  },
  item: {
    fontSize: 16,
  },
}
