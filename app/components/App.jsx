import React from 'react';
import { connect } from "react-redux";

import Boon from './Boon.jsx';
import boons from '../data/boons.json';
import BoonSelector from './BoonSelector.jsx';

const boonDataByType = {
  attack: [],
  special: [],
  cast: [],
  dash: [],
  call: [],
  other: [],
};

// Organise our boons based on type.
boons.data.forEach(boon => {
  if (boonDataByType[boon.type]) {
    boonDataByType[boon.type].push(boon);
  } else {
    boonDataByType.other.push(boon);
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      boons: [],
      openPosition: ""
    };
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }
  onOpen(boonPosition, boons) {
    // Open the boon selector.
    this.setState({
      open: true,
      boons,
      openPosition: boonPosition
    });
  }
  onClose(e) {
    // Make sure we don't also fire the main open function.
    e.stopPropagation();
    // Close the boon selector.
    this.setState({
      open: false,
      boons: [],
      openPosition: ""
    });
  }
  render() {
    const {openPosition, boons, open} = this.state;
    const boonSelectors = Object.keys(this.props.App.boons);
    return (
      <div className="boons-container">
        {
          boonSelectors.map((boonPosition) => {
            const boons = boonDataByType[boonPosition] || boonDataByType.other;
            const selectedBoon = this.props.App.boons[boonPosition];
            return (
              <Boon
                boonPosition={boonPosition}
                openPosition={openPosition}
                onOpen={this.onOpen}
                boons={boons}
                selectedBoon={selectedBoon}
                key={boonPosition}
              />
            );
          })
        }
        <BoonSelector openPosition={openPosition} boons={boons} open={open} onClose={this.onClose}/>
      </div>
    )
  }
};

export default connect(state => ({
  App: state.App
}))(App);
