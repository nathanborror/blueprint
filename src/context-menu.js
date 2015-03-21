
var UIContextMenuNotification = 1000
var UIContextMenuDismissNotification = 1001

class ContextItem extends React.Component {
  render() {
    return (
      <div className="bp-context-item" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
}

class ContextMenu extends React.Component {
  constructor(props) {
    super(props)
    this.defaults = {
      origin: {left: -1000, top: -1000},
      wide: false,
      autoselect: false,
    }
    this.state = {items: [], options: this.defaults}
  }

  componentDidMount() {
    this.setState({items: [], options: this.defaults})
    this.props.notifications.addObserver(UIContextMenuNotification, this.handleNotification.bind(this))
    this.props.notifications.addObserver(UIContextMenuDismissNotification, this.handleDismiss.bind(this))
  }

  handleNotification(notification) {
    var options = _.defaults(notification.options, this.defaults)

    var menuWidth = React.findDOMNode(this).clientWidth
    var menuHeight = React.findDOMNode(this).clientHeight

    var left = options.origin.left - window.scrollX
    var top = options.origin.top - window.scrollY

    if ((top + menuHeight) > window.innerHeight) {
      top = top - menuHeight
    }
    if ((left + menuWidth) > window.innerWidth) {
      left = left - menuWidth
    }

    options.origin = {left: left, top: top}

    this.state.items = notification.items
    this.state.options = options
    this.setState(state)
  }

  handleDismiss() {
    this.state.items = []
    this.state.options = this.defaults
    this.setState(this.state)
  }

  render() {
    var cx = React.addons.classSet
    var classes = cx({
      'bp-context-menu': true,
      'bp-context-menu-wide': this.state.options.wide
    })

    var items = this.state.items.map(item => {
      return <ContextItem onClick={item.onClick}>{item.title}</ContextItem>
    })

    return (
      <div className={classes} style={this.state.options.origin}>
        {items}
      </div>
    )
  }
}
