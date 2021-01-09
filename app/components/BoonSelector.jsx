/**/

import React from 'react';
import { connect } from "react-redux";
import at from '../actions.js';
import BoonDetails from './BoonDetails.jsx';

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
        hermes: true,
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

    const godLabels = "aphrodite, ares, artemis, athena, demeter, dionysus, hermes, poseidon, zeus".split(", ");

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
                <BoonDetails
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
