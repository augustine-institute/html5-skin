/********************************************************************
  NEXT UP PANEL
*********************************************************************/
/**
* The screen used while the video is playing.
*
* @class FormedNextUpPanel
* @constructor
*/
var React = require('react'),
    CONSTANTS = require('./../constants/constants'),
    ClassNames = require('classnames'),
    Utils = require('./utils'),
    // CloseButton = require('./closeButton'),
    CountDownClock = require('./countDownClock'),
    Icon = require('../components/icon');

var FormedNextUpPanel = React.createClass({
  // collapseFormedNextUpPanel: function() {
  //   this.props.controller.nextUpDismissButtonClicked();
  // },

  //NOTE: Next up data is in this.props.controller.state.playerParam.nextUp

  handleFormedNextUpClick: function(event) {
    event.preventDefault();
    this.props.controller.mb.publish('NEXTUPTRIGGER', true);
  },

  handleFormedNextUpPanelExpandCollapse: function(event) {
    event.preventDefault();
    this.props.controller.state.formedNextUpCollapsed = !this.props.controller.state.formedNextUpCollapsed;
  },

  render: function() {
    var thumbnailStyle = {};
    if (Utils.isValidString(this.props.controller.state.playerParam.nextUp.thumbnailUrl)) {
      thumbnailStyle.backgroundImage = "url('" + this.props.controller.state.playerParam.nextUp.thumbnailUrl + "')";
    }

    var countdownString = "";
    if (this.props.controller.state.formedNextUpCountdown && this.props.controller.state.formedNextUpCountdown < 11) {
      countdownString = ": ";
      countdownString += parseInt(this.props.controller.state.formedNextUpCountdown);
      countdownString += " SECOND";
      if (parseInt(this.props.controller.state.formedNextUpCountdown) !== 1) {
        countdownString += "S";
      }
    }

    if (!this.props.controller.state.formedNextUpVisible) {
      return null;
    }

    var nextUpClass = ClassNames({
      "formed-next-up": true,
      "formed-next-up-collapsed": !!this.props.controller.state.formedNextUpCollapsed,
    });

    var collapseControlClass = ClassNames({
      "fa": true,
      "fa-angle-down": !this.props.controller.state.formedNextUpCollapsed,
      "fa-angle-up": this.props.controller.state.formedNextUpCollapsed,

    })

    return (
      <div className={nextUpClass}>
        <a className="formed-next-up-panel-control" onClick={this.handleFormedNextUpPanelExpandCollapse}>
          <i className={collapseControlClass}/>
        </a>
        <a className="formed-next-up-thumbnail" onClick={this.handleFormedNextUpClick} style={thumbnailStyle}>
          <Icon {...this.props} icon="play"/>
        </a>

        <div className="formed-next-up-metadata">
          <div className="formed-next-up-title">
            <span className="formed-next-up-text">UP NEXT{countdownString}</span>

            <div className="oo-up-next-title-text oo-text-truncate">
              <span dangerouslySetInnerHTML={Utils.createMarkup(this.props.controller.state.playerParam.nextUp.title)}></span>
            </div>
          </div>

        </div>

      </div>
    );
  }
});

// FormedNextUpPanel.propTypes = {
//   nextUpInfo: React.PropTypes.shape({
//     nextUpData: React.PropTypes.shape({
//       preview_image_url: React.PropTypes.string,
//       name: React.PropTypes.string,
//       description:React.PropTypes.string
//     })
//   }),
//   skinConfig: React.PropTypes.shape({
//     nextUp: React.PropTypes.shape({
//       timeToShow: React.PropTypes.number
//     }),
//     icons: React.PropTypes.objectOf(React.PropTypes.object)
//   })
// };
//
// FormedNextUpPanel.defaultProps = {
//   skinConfig: {
//     nextUp: {
//       timeToShow: 10
//     },
//     icons: {
//       play:{fontStyleClass:'oo-icon oo-icon-play'},
//       dismiss:{fontStyleClass:'oo-icon oo-icon-close'}
//     }
//   },
//   nextUpInfo: {
//     nextUpData: {}
//   },
//   controller: {
//     nextUpDismissButtonClicked: function(){},
//     sendDiscoveryClickEvent: function(a,b){}
//   }
// };

module.exports = FormedNextUpPanel;