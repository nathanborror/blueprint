
var UIModalNotification = 1001

var Modal = React.createClass({
  defaults: {
    visible: false,
    contents: null
  },
  getInitialState: function() {
    this.props.notifications.addObserver(UIModalNotification, this.handleDisplay);
    return {visible: false, contents: null};
  },
  handleDisplay: function(dispatch) {
    var state = _.defaults(dispatch, this.defaults);
    this.setState(state);
  },
  handleDismiss: function() {
    this.state.visible = false;
    this.setState(this.state);
  },
  handleIgnore: function(e) {
    e.stopPropagation();
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'bp-modal-mask': true,
      'bp-modal-mask-active': this.state.visible
    });

    return (
      <div className={classes} onClick={this.handleDismiss}>
        <div className='bp-modal' onClick={this.handleIgnore}>
          {this.state.contents}
        </div>
      </div>
    );
  }
});
