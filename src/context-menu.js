
var UIContextMenuNotification = 1000

var ContextItem = React.createClass({
  render: function() {
    return (
      <div className="bp-context-item" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
});

var ContextMenu = React.createClass({
  defaults: {
    origin: {left: -1000, top: -1000},
    wide: false,
    autoselect: false
  },
  getInitialState: function() {
    return {items: [], options: this.defaults};
  },
  componentDidMount: function() {
    this.setState({items: [], options: this.defaults});
    this.props.notifications.addObserver(UIContextMenuNotification, this.handleDisplay);
  },
  handleDisplay: function(dispatch) {
    var options = _.defaults(dispatch.options, this.defaults);

    if (dispatch.origin === null) {
      this.setState({items: [], options: options});
      return;
    }

    var menuWidth = this.getDOMNode().clientWidth;
    var menuHeight = this.getDOMNode().clientHeight;

    var left = options.origin.left - window.scrollX;
    var top = options.origin.top - window.scrollY;

    if ((top + menuHeight) > window.innerHeight) {
      top = top - menuHeight;
    }
    if ((left + menuWidth) > window.innerWidth) {
      left = left - menuWidth;
    }

    options.origin = {left: left, top: top};

    this.setState({
      items: dispatch.items,
      options: options
    });
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'bp-context-menu': true,
      'bp-context-menu-wide': this.state.options.wide
    });

    var items = this.state.items.map(function(item) {
      return <ContextItem onClick={item.onClick}>{item.title}</ContextItem>
    });

    return (
      <div className={classes} style={this.state.options.origin}>
        {items}
      </div>
    );
  }
});
