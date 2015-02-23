
var FormUtil = {
  cleanedData: function (refs) {
    var data = {};
    for (ref in refs) {
      data[ref] = refs[ref].getDOMNode().value.trim();
    }
    return data;
  }
};


// MARK: Form

var Form = React.createClass({
  render: function() {
    return (
      <div className='bp-form'>
        {this.props.children}
      </div>
    );
  }
});


// MARK: Field

var Field = React.createClass({
  render: function() {
    if (this.props.multiline) {
      return <textarea ref={this.props.ref} placeholder={this.props.placeholder} value={this.props.children} />;
    }
    return <input type='text' ref={this.props.ref} placeholder={this.props.placeholder} value={this.props.children} />;
  }
});


// MARK: Button

var Button = React.createClass({
  render: function() {
    return (
      <div className='bp-button' onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
});


// MARK: Token Field

var TokenField = React.createClass({
  clearSelectAll: function() {
    if (this.state.selectAll) {
      this.state.selectAll = false;
      this.setState(this.state);
    }
  },

  getInitialState: function() {
    return {value: '', selectAll: false};
  },
  componentDidMount: function() {
    this.setState({value: '', selectAll: false});
  },
  handleKeyDown: function(e) {
    switch (e.keyCode) {
      case 32: // Space
        this.clearSelectAll();
        break;
      case 8: // Backspace
        if (this.state.selectAll) {
          this.state.selectAll = false;
          this.state.value = '';
          this.setState(this.state);
        } else {
          this.state.value = this.state.value.slice(0, -1);
          this.setState(this.state);
        }
        break;
      case 65: // A
        if (e.metaKey) {
          this.state.selectAll = true;
          this.setState(this.state);
          break;
        }
      default:
        this.clearSelectAll();
    }
  },
  handleChange: function(e) {
    var input = this.refs.text.getDOMNode();
    this.state.value = this.state.value + e.target.value
    this.setState(this.state);
  },
  handleFocus: function(e) {
    var input = this.refs.text.getDOMNode();
    input.focus();
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'bp-token': true,
      'bp-token-select-all': this.state.selectAll
    });

    var results = this.state.value.match(/(@\w+?)+/);
    console.log(results)
    if (results) {

    } else {

    }

    return (
      <div className={classes} onClick={this.handleFocus}>
        <div className="bp-token-value">{this.state.value}</div>
        <input className="bp-token-input" type="text" ref="text" value="" onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
      </div>
    );
  }
});
