var React = require('react');
var ClassNames = require('classnames');
var Utils = require('./utils');
var CONSTANTS = require('../constants/constants');

var AccessibleButton = React.createClass({

  componentDidMount: function() {
    this.triggeredWithKeyboard = false;
  },

  wasTriggeredWithKeyboard: function(triggeredWithKeyboard) {
    if (typeof triggeredWithKeyboard !== 'undefined') {
      this.triggeredWithKeyboard = !!triggeredWithKeyboard;
    }
    return this.triggeredWithKeyboard;
  },

  focus: function() {
    if (this.domElement && typeof this.domElement.focus === 'function') {
      this.domElement.focus();
    }
  },

  /**
   * Fires when a key is pressed on the button.
   * @private
   * @param {type} event The keydown event object.
   */
  onKeyDown: function(event) {
    switch (event.key) {
      case CONSTANTS.KEY_VALUES.SPACE:
      case CONSTANTS.KEY_VALUES.ENTER:
      // Ctrl and Alt are needed as a workaround for VoiceOver, which uses the
      // CTRL + OPTION + SPACE combination to activate buttons. VoiceOver actually
      // suppresses the spacebar keyboard event when this combination is used, so we
      // can only detect either CTRL or OPTION. This can obviously fail if the user
      // presses a different key after CTRL + OPTION, but a false positive is preferred.
      case CONSTANTS.KEY_VALUES.CONTROL:
      case CONSTANTS.KEY_VALUES.ALT:
        this.triggeredWithKeyboard = true;
        break;
      default:
        break;
    }
  },

  render: function() {
    return (
      <button
        ref={function(e) { this.domElement = e }.bind(this)}
        type="button"
        style={this.props.style}
        className={ClassNames(this.props.className, 'oo-focusable-btn')}
        tabIndex="0"
        data-focus-id={this.props.focusId}
        aria-label={this.props.ariaLabel}
        aria-checked={this.props.ariaChecked}
        aria-haspopup={this.props.ariaHasPopup}
        aria-expanded={this.props.ariaExpanded}
        role={this.props.role}
        onKeyDown={this.onKeyDown}
        onMouseUp={Utils.blurOnMouseUp}
        onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }

});

AccessibleButton.propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string,
  focusId: React.PropTypes.string,
  ariaLabel: React.PropTypes.string.isRequired,
  ariaChecked: React.PropTypes.bool,
  ariaHasPopup: React.PropTypes.bool,
  ariaExpanded: React.PropTypes.bool,
  role: React.PropTypes.string,
  onClick: React.PropTypes.func
};

AccessibleButton.defaultProps = {
  focusId: Math.random().toString(36).substr(2, 10),
  ariaChecked: null,
  ariaHasPopup: null,
  ariaExpanded: null,
  role: null,
};

module.exports = AccessibleButton;
