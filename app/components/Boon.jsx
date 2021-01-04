/* */

import React from 'react';
import at from '../actions.js';

class Boon extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    const {boons, boonPosition, openPosition} = this.props;
    const selected = boonPosition === openPosition;
    if (selected) {
      this.props.onClose();
    } else {
      this.props.onOpen(boonPosition, boons);
    }
  }
  render() {
    const {boons, boonPosition, openPosition, standardBoonType} = this.props;
    const selected = boonPosition === openPosition;
    const selectedBoonName = this.props.selectedBoon?.name;
    const selectedBoonImage = this.props.selectedBoon?.image;

    let imageElement = null;
    let className = "boon-container";
    if (selected) {
      className += " opened";
    }

    if (selectedBoonImage) {
      imageElement = <img src={`./images/${selectedBoonImage}`}/>;
    } else if (standardBoonType) {
      imageElement = <img className="empty-image-placeholder" src={`./images/Empty_${standardBoonType}.png`}/>;
    }
    return (
      <div title={selectedBoonName || boonPosition} className={className} onClick={this.onClick}>
        {imageElement}
      </div>
    )
  }
};

export default Boon;
