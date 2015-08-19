/********************************************************************
  UP NEXT PANEL
*********************************************************************/
/**
* The screen used while the video is playing.
*
* @class UpNextPanel
* @constructor
*/

var UpNextPanel = React.createClass({
  getInitialState: function() {
    this.isMobile = this.props.controller.state.isMobile;
    return {
      contentDescription: this.props.upNextInfo.upNextData.description
    };
  },

  componentDidMount: function() {
    var descriptionNode = this.refs.ContentDescription.getDOMNode();
    var shortDesc = Utils.truncateTextToWidth(descriptionNode, this.state.contentDescription);
    this.setState({contentDescription: shortDesc});
  },
   
  closeUpNextPanel: function(event) {
    if (event.type == 'touchend' || !this.isMobile){
      //since mobile would fire both click and touched events,
      //we need to make sure only one actually does the work

      console.log("Up next panel close button clicked");
      event.stopPropagation(); // W3C
      event.cancelBubble = true; // IE
      this.props.controller.upNextDismissButtonClicked();
    }
  },

  handleStartUpNextClick: function(event) {
    if (event.type == 'touchend' || !this.isMobile){
      //since mobile would fire both click and touched events,
      //we need to make sure only one actually does the work

      console.log("Up next panel start button clicked");
      event.stopPropagation(); // W3C
      event.cancelBubble = true; // IE

      // Use the same way as sending out the click event on discovery content
      var eventData = {
            "clickedVideo" : this.props.upNextInfo.upNextData,
            "custom" : {"source": "upNextScreen",
                        "countdown": 0,
                        "autoplay": true }
          };
      this.props.controller.sendDiscoveryClickEvent(eventData);
    }
  },

  render: function() {
    var panelStyle = upNextPanelStyle.panelStyle;

    var controlBarHeight = 60;
    panelStyle.bottom = (this.props.controlBarVisible ? controlBarHeight : 0);

    var contentImageContainerStyle = upNextPanelStyle.contentImageContainerStyle;
    var contentImageStyle = upNextPanelStyle.contentImageStyle;

    var playButtonClass = this.props.skinConfig.icons.play.fontStyleClass;
    var playButtonStyle = upNextPanelStyle.playButton.style;

    var contentMetadataContainerStyle = upNextPanelStyle.contentMetadataContainerStyle;
    
    var upNextTitleStyle = upNextPanelStyle.upNextTitleStyle;

    var upNextTitleTextStyle = upNextPanelStyle.upNextTitleTextStyle;
    var contentTile = this.props.upNextInfo.upNextData.name;
    var upNextString = Utils.getLocalizedString(this.props.preferredLanguage, "Up next", this.props.localizableStrings, this.props.skinConfig);

    var contentDescriptionStyle = upNextPanelStyle.contentDescriptionStyle;
    
    var dismissButtonStyle = upNextPanelStyle.dismissButtonStyle;
    var dismissButtonTextStyle = upNextPanelStyle.dismissButtonTextStyle;

    return (
      <div style={panelStyle}>
        <div style={contentImageContainerStyle} onClick={this.handleStartUpNextClick} onTouchEnd={this.handleStartUpNextClick}>
          <img style={contentImageStyle} src={this.props.upNextInfo.upNextData.preview_image_url}></img>
          <span className={playButtonClass} style={playButtonStyle} aria-hidden="true"></span>
        </div>

        <div style={contentMetadataContainerStyle}>
          <div style={upNextTitleStyle}>
            <div style={upNextTitleTextStyle}>
              {upNextString}: {contentTile}
            </div>

            <CountDownClock {...this.props} timeToShow={this.props.skinConfig.upNextScreen.timeToShow}/>

          </div>

          <div ref="ContentDescription" style={contentDescriptionStyle}>
            {this.state.contentDescription}
          </div>
        </div>
        <div onClick={this.closeUpNextPanel} onTouchEnd={this.closeUpNextPanel} style={upNextPanelStyle.closeButton} className={this.props.skinConfig.icons.dismiss.fontStyleClass}></div>
      </div>
    );
  }
});