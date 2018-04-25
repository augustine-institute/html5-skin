var React = require('react'),
  AccessibleButton = require('./accessibleButton'),
  ClassNames = require('classnames');

var ShareButton = React.createClass({
  handleShareClick: function() {
    this.props.controller.mb.publish(OO.EVENTS.PAUSE);
    this.props.controller.mb.publish('SHARECLICK');
  },

  render: function() {
    var shareButtonClass = ClassNames({
      "oo-share-button": true,
      "oo-share-button-hidden": !this.props.controlBarVisible
    });

    return (
      <AccessibleButton
        className={shareButtonClass}
        ariaHidden="true"
        ariaLabel="ShareButton"
        onClick={this.handleShareClick}>

        <i className='fa fa-share' aria-hidden="true"></i>&nbsp;Share&nbsp;Topic

      </AccessibleButton>
    );
  }
});

module.exports = ShareButton;
