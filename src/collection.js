
class Cell extends React.Component {
  render() {
    var cx = React.addons.classSet
    var classes = cx({
      'bp-cell': true,
      'bp-cell-selected': this.props.selected,
      'bp-cell-highlighted': this.props.highlighted,
      'bp-cell-disabled': this.props.disabled,
    })

    return (
      <div className={classes} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
}

class Section extends React.Component {
  render() {
    return (
      <div className='bp-section'>
        {this.props.title}
      </div>
    )
  }
}

class Collection extends React.Component {
  render() {
    return (
      <div className='bp-collection'>
        {this.props.children}
      </div>
    )
  }
}
