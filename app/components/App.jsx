/* */

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
  onClose() {
    // Close the boon selector.
    this.setState({
      open: false,
      boons: [],
      openPosition: ""
    });
  }
  render() {
    const {openPosition, boons, open} = this.state;
    const {App} = this.props;
    const boonSelectors = Object.keys(App.boons);
    const currentlySelectedBoon = App.boons[openPosition];
    return (
      <div className="app-container">
        <div className="boons-container">
          {
            boonSelectors.map((boonPosition) => {
              // We kinda care if the boon is one of the hard standard coded types.
              const standardBoonType = boonDataByType[boonPosition] && boonPosition;
              const boons = boonDataByType[boonPosition] || boonDataByType.other;
              const selectedBoon = App.boons[boonPosition];
              return (
                <Boon
                  boonPosition={boonPosition}
                  openPosition={openPosition}
                  onOpen={this.onOpen}
                  onClose={this.onClose}
                  boons={boons}
                  selectedBoon={selectedBoon}
                  key={boonPosition}
                  standardBoonType={standardBoonType}
                />
              );
            })
          }
        </div>
        <BoonSelector
          openPosition={openPosition}
          boons={boons}
          open={open}
          onClose={this.onClose}
          currentlySelectedBoon={currentlySelectedBoon}
        />
      </div>
    )
  }
};

export default connect(state => ({
  App: state.App
}))(App);
