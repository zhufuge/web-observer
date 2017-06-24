import React from 'react';

import FreqTab from './FreqTab';
import TimeTab from './TimeTab';

export default
class MainContent extends React.Component {
  render() {
    const tab = this.props.tab === '1' ? <FreqTab /> : <TimeTab />;
    return (
      <div style={styles.container}>
        {tab}
      </div>
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
