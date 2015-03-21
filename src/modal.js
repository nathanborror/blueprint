
var UIModalNotification = 1001

class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.defaults = {visible: false, contents: null}
    this.props.notifications.addObserver(UIModalNotification, this.handleDisplay.bind(this))
    this.state = {visible: false, contents: null}
  }

  handleDisplay(dispatch) {
    var state = _.defaults(dispatch, this.defaults)
    this.setState(state)
  }

  handleDismiss() {
    this.state.visible = false
    this.setState(this.state)
  }

  handleIgnore(e) {
    e.stopPropagation()
  }

  render() {
    var cx = React.addons.classSet
    var classes = cx({
      'bp-modal-mask': true,
      'bp-modal-mask-active': this.state.visible
    })

    return (
      <div className={classes} onClick={this.handleDismiss.bind(this)}>
        <div className='bp-modal' onClick={this.handleIgnore.bind(this)}>
          {this.state.contents}
        </div>
      </div>
    )
  }
}
