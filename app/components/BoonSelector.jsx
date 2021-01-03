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
    const { boon, openPosition, dispatch } = this.props;
    dispatch({
      type: at.ADD_BOON,
      data: {
        boon,
        position: openPosition
      }
    });
  }
  isBoonAvailable() {
    const { boon, selectedBoons } = this.props;
    let available = true;
    console.log(boon);
    // If boon doesn't have any prerequisites, it is tier 1 and available by default.
    if (boon.prerequisites?.length) {
      // Loop through prerequisites array, and see if any selected Boons match.
      console.log(boon.prerequisites);
      for (const prerequisite of boon.prerequisites) {
        let selectedAvailable = false;
        // Go through each currently selected boon until we find a match.
        for (const selectedBoon of selectedBoons) {
          if (prerequisite.includes(selectedBoon)) {
            console.log(selectedBoon, prerequisite);
            selectedAvailable = true;
            break;
          }
        }
        if (!selectedAvailable) {
          available = false;
          break;
        }
      }
      console.log(available);
    }
    return available;
  }
  render() {
    const { boon } = this.props;
    let available = true;
    if (this.isBoonAvailable()) {
      return (
        <div onClick={this.addBoon}>
          {boon.name}
        </div>
      );
    }
    return (
      <div>
        {boon.name} unavailable
      </div>
    );
  }
};

class BoonSelector extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }
  onClose() {
    this.props.onClose();
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
                openPosition={openPosition}
                key={boon.name}
                boon={boon}
                dispatch={dispatch}
                selectedBoons={selectedBoons}
              />
            ); 
          })
        }
        <button onClick={onClose}>close</button>
      </div>
    )
  }
};

export default connect(state => ({
  App: state.App
}))(BoonSelector);
