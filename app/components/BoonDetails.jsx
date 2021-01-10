/**/

import React from 'react';
import { connect } from "react-redux";
import at from '../actions.js';
import tools from '../tools.js';

class BoonDetails extends React.Component {
  constructor(props) {
    super(props);
    this.boonRef = React.createRef();
    this.addBoon = this.addBoon.bind(this);
  }
  componentDidMount() {
    this.maybeScrollIntoView();
  }
  componentDidUpdate(prevProps) {
    this.maybeScrollIntoView();
  }
  maybeScrollIntoView() {
    const { boon, currentlySelectedBoon } = this.props;
    const isCurrentlySelectedBoon = currentlySelectedBoon?.name === boon.name;
    if (isCurrentlySelectedBoon) {
      this.boonRef?.current?.scrollIntoView();
    }
  }
  addBoon() {
    const { boon } = this.props;
    this.props.addBoon(boon);
  }
  isBoonAvailable() {
    const { boon, selectedBoons } = this.props;
    return tools.isBoonAvailable(boon, selectedBoons);
  }
  renderPrerequisites() {
    const { boon, selectedBoons } = this.props;
    if (!boon.prerequisites?.length) {
      return null;
    }
    const prerequisiteUsed = [];
    return (
      <div className="boon-details-prerequisites">
        <div>Prerequisites</div>
        {
          boon.prerequisites.map((prerequisite, prerequisiteIndex) => {
            const prerequisiteSplit = prerequisite.split(", ");
            const isLastPrerequisite = (boon.prerequisites.length-1) === prerequisiteIndex;
            let found = false;
            let andBlock = null;
            if (!isLastPrerequisite) {
              andBlock = <div className="prerequisite-boon-joiner">and</div>;
            }
            return (
              <div>
                {
                  prerequisiteSplit.map((prerequisiteBoon, boonIndex) => {
                    const isLastBoon = (prerequisiteSplit.length-1) === boonIndex;
                    const needsOr = isLastBoon && prerequisiteSplit.length > 1;
                    let className = "prerequisite-boon-item";
                    let selected = false;
                    if (
                      !found &&
                      !prerequisiteUsed.includes(prerequisiteBoon) &&
                      selectedBoons.includes(prerequisiteBoon)
                    ) {
                      prerequisiteUsed.push(prerequisiteBoon);
                      found = true;
                      className += " selected";
                    }
                    //let content = `${prerequisiteBoon}, `;
                    let content = (
                      <span className={className}>{prerequisiteBoon}</span>
                    );
                    let commanBlock = <span className="prerequisite-boon-joiner">, </span>;
                    let orBlock = null;
                    if (isLastBoon) {
                      commanBlock = null;
                      if (needsOr) {
                        orBlock = <span className="prerequisite-boon-joiner"> or </span>;
                      }
                    }
                    return (
                      <span>{orBlock}{content}{commanBlock}</span>
                    );
                  })
                }
                {andBlock}
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
    let className = "boon-details";
    const boonImage = boon?.image;
    const boonDetails = (
      <div className="boon-details-inner">
        <img src={`./images/${boonImage}`}/>
        <div className="boon-details-text">
          <div className="boon-details-basic">
            <div className="boon-details-title"><span>{boon.name}</span><span>{boon.god}</span></div>
            <div dangerouslySetInnerHTML={{__html: boon.text}} />
          </div>
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
    }
    return (
      <div ref={this.boonRef} className={className} onClick={this.addBoon}>
        {boonDetails}
      </div>
    );
  }
};

export default BoonDetails;
