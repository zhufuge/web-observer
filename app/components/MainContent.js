import React from 'react';

import VisitTab from './VisitTab';
import TimeTab from './TimeTab';

export default
class MainContent extends React.Component {
  render() {
    const tab = this.props.tab === '1' ? <VisitTab /> : <TimeTab />;
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
