/**/

import React from 'react';
import { connect } from "react-redux";
import at from '../actions.js';

class SelectorItem extends React.Component {
  constructor(props) {
    super(props);
    this.addBoon = this.addBoon.bind(this);
  }
  addBoon() {
    const { boon } = this.props;
    this.props.addBoon(boon);
  }
  isBoonAvailable() {
    const { boon, selectedBoons } = this.props;
    let available = true;
    // If boon doesn't have any prerequisites, it is tier 1 and available by default.
    if (boon.prerequisites?.length) {
      // Loop through prerequisites array, and see if any selected Boons match.
      for (const prerequisite of boon.prerequisites) {
        let selectedAvailable = false;
        // Go through each currently selected boon until we find a match.
        for (const selectedBoon of selectedBoons) {
          if (prerequisite.includes(selectedBoon)) {
            selectedAvailable = true;
            break;
          }
        }
        if (!selectedAvailable) {
          available = false;
          break;
        }
      }
    }
    return available;
  }
  render() {
    const { boon } = this.props;
    let available = true;
    if (this.isBoonAvailable()) {
      return (
        <div className="boon-selector-item" onClick={this.addBoon}>
          {boon.name}
        </div>
      );
    }
    return (
      <div className="boon-selector-item">
        {boon.name} unavailable
      </div>
    );
  }
};

class BoonSelector extends React.Component {
  constructor(props) {
    super(props);
    this.onClear = this.onClear.bind(this);
    this.addBoon = this.addBoon.bind(this);
  }
  addBoon(boon) {
    const { openPosition, dispatch } = this.props;
    dispatch({
      type: at.ADD_BOON,
      data: {
        boon: boon,
        position: openPosition
      }
    });
    this.props.onClose();
  }
  onClear() {
    // This just adds a null boon to this position, which is the initial empty state.
    this.addBoon(null);
  }
  render() {
    if (!this.props.open) {
      return null;
    }
    // The name boons is too generic, this is more like available boons.
    const { App, boons, openPosition, dispatch, onClose } = this.props;
    const boonSelectors = Object.keys(App.boons);

    // Probably want to store a list of selected boons in redux and update it as a boon is added.
    // Instead of generating it on demand here.
    const selectedBoons = boonSelectors
      .filter(boonPosition => App.boons[boonPosition])
      .map(boonPosition => App.boons[boonPosition].name);

    return (
      <div className="boon-selector">
        <div>boon selector</div>
        {
          boons.map((boon) => {     
            return (
              <SelectorItem
                key={boon.name}
                boon={boon}
                selectedBoons={selectedBoons}
                addBoon={this.addBoon}
              />
            ); 
          })
        }
        <button onClick={this.onClear}>clear</button>
        <button onClick={onClose}>close</button>
      </div>
    )
  }
};

export default connect(state => ({
  App: state.App
}))(BoonSelector);
