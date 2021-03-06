
class Stack extends React.Component {
  render() {
    var classes = this.props.className ? this.props.className : ''
    var styles = {
      display: this.props.horizontal ? '-webkit-flex' :  'block',
      WebkitJustifyContent: 'space-between'
    }

    return (
      <div className={'bp-stack '+classes} style={styles}>
        {this.props.children}
      </div>
    )
  }
}

class Group extends React.Component {
  constructor(props) {
    super(props)

    this.defaults = {
      grow: 1,
      shrink: 1,
      basis: ''
    }
  }

  render() {
    var classes = this.props.className ? this.props.className : ''
    var options = _.defaults(this.props.options, this.defaults)
    var styles = {
      WebkitFlex: options.grow+' '+options.shrink+' '+options.basis,
      WebkitOrder: this.props.order
    }

    return (
      <div className={'bp-group '+classes} style={styles}>
        {this.props.children}
      </div>
    )
  }
}
