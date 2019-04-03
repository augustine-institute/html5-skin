/********************************************************************
  UP NEXT PANEL
*********************************************************************/
/**
* The screen used while the video is playing.
*
* @class FormedNextUpPanel
* @constructor
*/
var React = require('react'),
    CONSTANTS = require('./../constants/constants'),
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
    this.props.controller.mb.publish('NEXTUPTRIGGER');
  },

  render: function() {
    var thumbnailStyle = {};
    if (Utils.isValidString(this.props.controller.state.playerParam.nextUp.thumbnailUrl)) {
      thumbnailStyle.backgroundImage = "url('" + this.props.controller.state.playerParam.nextUp.thumbnailUrl + "')";
    }

    return (
      <div className="formed-next-up">
        <a className="formed-next-up-thumbnail" onClick={this.handleFormedNextUpClick} style={thumbnailStyle}>
          <Icon {...this.props} icon="play"/>
        </a>

        <div className="formed-next-up-metadata">
          <div className="formed-next-up-title">
            // <CountDownClock {...this.props} timeToShow={this.props.skinConfig.nextUp.timeToShow} currentPlayhead={this.props.currentPlayhead}/>

            <div className="formed-next-up-text">UP NEXT</div>

            <div className="oo-up-next-title-text oo-text-truncate">
              <span dangerouslySetInnerHTML={Utils.createMarkup(this.props.controller.state.playerParam.nextUp.title)}></span>
            </div>
          </div>

          <div className="oo-content-description oo-text-truncate" dangerouslySetInnerHTML={Utils.createMarkup(this.props.nextUpInfo.nextUpData.description)}></div>
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