import React from 'react';
import { Icon, Menu } from 'antd';
const Item = Menu.Item;

export default
class SiderContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.item
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({current: e.key});
    this.props.onSelected(e.key);
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.logo}>
          <Icon type="eye" style={styles.eyeIcon}/>
          <div style={styles.title}>Web Observer</div>
        </div>
        <div style={styles.divider}></div>
        <Menu
          theme="dark"
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          inlineIndent={0}
          mode="inline">
          <Item key="1" style={styles.item}>
            <Icon type="retweet" style={styles.icon}/> 次数
          </Item>
          <Item key="2" style={styles.item}>
            <Icon type="hourglass" style={styles.icon}/> 时间
          </Item>
          <Item key="3" style={styles.item}>
            <Icon type="calendar" style={styles.icon}/> 总体
          </Item>
        </Menu>
        <div style={styles.footer}>zhufuge ©2017</div>
      </div>
    );
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
    fontSize: 18,
  },
  icon: {
    fontSize: 26,
  },
  footer: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
  }
};
