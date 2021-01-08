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
    const {boons, boonPosition, openPosition, standardBoonType, selectedBoon} = this.props;
    const selected = boonPosition === openPosition;
    const selectedBoonName = selectedBoon?.name;
    const selectedBoonImage = selectedBoon?.image;
    // Text is normally formatted, but for tooltips we don't want that.
    const selectedBoonText = (selectedBoon?.text || "").replace(/<[^>]*>?/gm, '');;

    let imageElement = null;
    let className = "boon-container";
    if (selected) {
      className += " opened";
    }

    if (selectedBoon?.legendary) {
      className += " legendary";
    } else if (selectedBoon?.duo) {
      className += " duo";
    }

    if (selectedBoonImage) {
      imageElement = <img src={`./images/${selectedBoonImage}`}/>;
    } else if (standardBoonType) {
      imageElement = <img className="empty-image-placeholder" src={`./images/Empty_${standardBoonType}_basic.png`}/>;
    }
    //const title = `${selectedBoonName || boonPosition}\n${selectedBoonText}`;
    const title = (selectedBoonName || boonPosition) + (selectedBoonText && `\n${selectedBoonText}`);
    return (
      <div title={title} className={className} onClick={this.onClick}>
        {imageElement}
      </div>
    )
  }
};

export default Boon;
