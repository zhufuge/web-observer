import React from 'react'
import { Icon, Menu } from 'antd'
const Item = Menu.Item

export default
class SiderContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: props.tab
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.setState({current: e.key})
    this.props.onSelected(e.key)
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.logo}>
          <Icon type="eye" style={styles.eyeIcon}/>
          <div style={styles.title}>Web Observer</div>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          inlineIndent={0}
          mode="inline">
          <Item key="1" style={styles.item}>
            <Icon type="retweet" style={styles.icon}/>
            <span style={styles.itemText}>网站记录</span>
          </Item>
          <Item key="2" style={styles.item}>
            <Icon type="hourglass" style={styles.icon}/>
            <span style={styles.itemText}>时间记录</span>
          </Item>
          <Item key="3" style={styles.item}>
            <Icon type="calendar" style={styles.icon}/>
            <span style={styles.itemText}>总体记录</span>
          </Item>
        </Menu>
      </div>
    )
  }
}

const styles = {
  container: {
    height: '100%',
  },
  logo: {
    margin: '32px 0',
    width: '100%',
    textAlign: 'center',
    borderRight: '1px solid #e9e9e9',
  },
  eyeIcon: {
    fontSize: 56,
    color: '#999',
  },
  title: {
    color: '#999',
    fontSize: 28,
  },
  divider: {
    width: '100%',
    height: 1,
    background: '#999',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    fontSize: 26,
  },
}
