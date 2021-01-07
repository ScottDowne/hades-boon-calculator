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
    const prerequisiteUsed = [];
    // If boon doesn't have any prerequisites, it is tier 1 and available by default.
    if (boon.prerequisites?.length) {
      // Loop through prerequisites array, and see if any selected Boons match.
      for (const prerequisite of boon.prerequisites) {
        let selectedAvailable = false;
        // Go through each currently selected boon until we find a match.
        for (const selectedBoon of selectedBoons) {
          if (!prerequisiteUsed.includes(selectedBoon) && prerequisite.includes(selectedBoon)) {
            prerequisiteUsed.push(selectedBoon);
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
  renderPrerequisites() {
    const { boon, selectedBoons } = this.props;
    if (!boon.prerequisites?.length) {
      return null;
    }
    const prerequisiteUsed = [];
    return (
      <div className="boon-selector-prerequisites">
        {
          boon.prerequisites.map((prerequisite) => {
            const prerequisiteSplit = prerequisite.split(", ");
            let found = false;
            return (
              <div>
                {
                  prerequisiteSplit.map((prerequisiteBoon, index) => {
                    const isLast = (prerequisiteSplit.length-1) === index;
                    let className = "prerequisite-boon-item";
                    let content = `${prerequisiteBoon}, `;
                    if (isLast) {
                      content = `${prerequisiteBoon}`;
                    }
                    let selected = false;
                    if (!found && !prerequisiteUsed.includes(prerequisiteBoon) && selectedBoons.includes(prerequisiteBoon)) {
                      prerequisiteUsed.push(prerequisiteBoon);
                      found = true;
                      className += " selected";
                    }
                    return (
                      <span className={className}>{content}</span>
                    );
                  })
                }
              </div>
            );
          })
        }
      </div>
    );
  }
  render() {
    const { boon, currentlySelectedBoon, selectedBoons } = this.props;
    const isBoonAvailable = this.isBoonAvailable();
    let available = true;
    let className = "boon-selector-item";
    const boonImage = boon?.image;
    const boonDetails = (
      <div className="boon-selector-item-inner">
        <img src={`./images/${boonImage}`}/>
        <div className="boon-selector-text">
          <div className="boon-selector-title">{boon.name}</div>
          {this.renderPrerequisites()}
        </div>
      </div>
    );

    const isCurrentlySelectedBoon = currentlySelectedBoon?.name === boon.name;
    const isSelected = selectedBoons.includes(boon.name);

    if (boon.legendary) {
      className += " legendary";
    } else if (boon.duo) {
      className += " duo";
    }

    if (!isBoonAvailable || isCurrentlySelectedBoon || isSelected) {
      if (isCurrentlySelectedBoon) {
        className += " selected";
      } else {
        className += " unavailable";
      }
      // Removing this for the time being, just trying it out.
      /*return (
        <div className={className}>
          {boonDetails}
        </div>
      );*/
    }
    return (
      <div className={className} onClick={this.addBoon}>
        {boonDetails}
      </div>
    );
  }
};

class BoonSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorFilters: {
        aphrodite: true,
        ares: true,
        artemis: true,
        athena: true,
        demeter: true,
        dionysus: true,
        poseidon: true,
        zeus: true
      }
    };
    this.onClear = this.onClear.bind(this);
    this.addBoon = this.addBoon.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
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
    //this.props.onClose();
  }
  handleFilter(e) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      selectorFilters: {
        ...this.state.selectorFilters,
        [name]: value
      }
    });
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
    const { App, boons, openPosition, dispatch, onClose, currentlySelectedBoon } = this.props;
    const boonSelectors = Object.keys(App.boons);
    const filteredBoons = boons.filter(
      boon => boon.god.toLowerCase().split("/")
        .every(god => this.state.selectorFilters[god])
    );
    let clearButton = null;

    // Probably want to store a list of selected boons in redux and update it as a boon is added.
    // Instead of generating it on demand here.
    const selectedBoons = boonSelectors
      .filter(boonPosition => App.boons[boonPosition])
      .map(boonPosition => App.boons[boonPosition].name);

    if (currentlySelectedBoon) {
      clearButton = <button onClick={this.onClear}>clear</button>;
    }

    const godLabels = "aphrodite, ares, artemis, athena, demeter, dionysus, poseidon, zeus".split(", ");

    /*const availableBoons = boons.filter(boon => {
      return !selectedBoons.includes(boon.name);
    });*/

    return (
      <div className="boon-selector-container">
        <div className="boon-selector-filter-container">
          {
            godLabels.map((godLabel) => {
              return (
                <label key={godLabel}>
                  <input
                    name={godLabel}
                    type="checkbox"
                    checked={this.state.selectorFilters[godLabel]}
                    onChange={this.handleFilter} />
                  {godLabel}
                </label>
              );
            })
          }
          {clearButton}
          <button onClick={onClose}>close</button>
        </div>
        <div className="boon-selector-scroller">
          {
            filteredBoons.map((boon) => {
              return (
                <SelectorItem
                  key={boon.name}
                  boon={boon}
                  currentlySelectedBoon={currentlySelectedBoon}
                  selectedBoons={selectedBoons}
                  addBoon={this.addBoon}
                />
              );
            })
          }
        </div>
      </div>
    )
  }
};

export default connect(state => ({
  App: state.App
}))(BoonSelector);
