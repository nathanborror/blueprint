
var FormUtil = {
  cleanedData: function (refs) {
    var data = {}
    for (ref in refs) {
      if (typeof refs[ref].value === 'function') {
        data[ref] = refs[ref].value()
      } else {
        data[ref] = React.findDOMNode(refs[ref]).value.trim()
      }
    }
    return data
  }
}


// MARK: Form

class Form extends React.Component {
  render() {
    return (
      <div className='bp-form'>
        {this.props.children}
      </div>
    )
  }
}


// MARK: Field

class Field extends React.Component {
  render() {
    if (this.props.multiline) {
      return <textarea ref={this.props.ref} placeholder={this.props.placeholder} value={this.props.children} />
    }
    return <input type='text' ref={this.props.ref} placeholder={this.props.placeholder} value={this.props.children} />
  }
}


// MARK: Button

class Button extends React.Component {
  render() {
    return (
      <div className='bp-button' onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
}


// MARK: Typeahead

class TypeaheadResult extends React.Component {
  handleClick() {
    this.props.onClick(this.props.identifier, this.props.children)
  }

  render() {
    return (
      <div className='bp-typeahead-result' onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </div>
    )
  }
}

class Typeahead extends React.Component {
  constructor(props) {
    super(props)

    this.defaults = {
      url: '/search',
      multiselect: false,
      label: (item) => {return item.title},
      identifier: (item) => {return item.key},
      data: (data) => {return data}
    }

    this.state = {
      data: [],
      options: this.defaults,
      query: '',
      identifier: '',
    }
  }

  value() {
    return this.state.identifier
  }

  componentDidMount() {
    this.state.options = _.defaults(this.props.options, this.defaults)
    this.setState(this.state)
  }

  handleChange(e) {
    this.state.query = e.target.value

    if (this.state.query === '') {
      this.state.data = []
      this.setState(this.state)
      return
    }

    $.get(this.state.options.url, {'q': this.state.query})
      .done(data => {
        this.state.data = this.state.options.data(data)
        this.setState(this.state)
      })
  }

  handleClick(identifier, label) {
    this.state.query = label
    this.state.identifier = identifier
    this.state.data = []
    this.setState(this.state)
  }

  handleClear() {
    this.state.identifier = ''
    this.state.query = ''
    this.setState(this.state)
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      var result = this.state.data[0]
      if (result !== undefined) {
        var identifier = this.state.options.identifier(result)
        var label = this.state.options.label(result)
        this.handleClick(identifier, label)
      }
    }
  }

  render() {
    var cx = React.addons.classSet
    var classes = cx({
      'bp-typeahead': true,
      'bp-typeahead-selected': this.state.identifier !== ''
    })

    var results = this.state.data.map(obj => {
      var identifier = this.state.options.identifier(obj)
      var label = this.state.options.label(obj)
      return <TypeaheadResult identifier={identifier} onClick={this.handleClick.bind(this)}>{label}</TypeaheadResult>
    })

    return (
      <div className={classes}>
        <div className='bp-typeahead-clear' onClick={this.handleClear.bind(this)} />
        <input type='type' ref='query' onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} placeholder={this.props.placeholder} value={this.state.query} />
        <div className='bp-typeahead-results'>{results}</div>
      </div>
    )
  }
}


// MARK: Mention Field

class MentionField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: '', selectAll: false}
  }

  componentDidMount() {
    this.setState({value: '', selectAll: false})
  }

  clearSelectAll() {
    if (this.state.selectAll) {
      this.state.selectAll = false
      this.setState(this.state)
    }
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 32: // Space
        this.clearSelectAll()
        break
      case 8: // Backspace
        if (this.state.selectAll) {
          this.state.selectAll = false
          this.state.value = ''
          this.setState(this.state)
        } else {
          this.state.value = this.state.value.slice(0, -1)
          this.setState(this.state)
        }
        break
      case 65: // A
        if (e.metaKey) {
          this.state.selectAll = true
          this.setState(this.state)
          break
        }
      default:
        this.clearSelectAll()
    }
  }

  handleChange(e) {
    var input = React.findDOMNode(this.refs.text)
    this.state.value = this.state.value + e.target.value
    this.setState(this.state)
  }

  handleFocus(e) {
    var input = React.findDOMNode(this.refs.text)
    input.focus()
  }

  render() {
    var cx = React.addons.classSet
    var classes = cx({
      'bp-token': true,
      'bp-token-select-all': this.state.selectAll
    })

    var results = this.state.value.match(/(@\w+?)+/)
    if (results) {

    } else {

    }

    return (
      <div className={classes} onClick={this.handleFocus.bind(this)}>
        <div className="bp-token-value">{this.state.value}</div>
        <input className="bp-token-input" type="text" ref="text" value="" onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} />
      </div>
    )
  }
}
