
var FormUtil = {
  cleanedData: function (refs) {
    var data = {};
    for (ref in refs) {
      if (typeof refs[ref].value === 'function') {
        data[ref] = refs[ref].value();
      } else {
        data[ref] = refs[ref].getDOMNode().value.trim();
      }
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


// MARK: Typeahead

var TypeaheadResult = React.createClass({
  handleClick: function() {
    this.props.onClick(this.props.identifier, this.props.children);
  },
  render: function() {
    return (
      <div className='bp-typeahead-result' onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
});

var Typeahead = React.createClass({
  defaults: {
    url: '/search',
    multiselect: false,
    label: function(item) {
      return item.title
    },
    identifier: function(item) {
      return item.key
    },
    data: function(data) {
      return data
    }
  },
  value: function() {
    return this.state.identifier;
  },
  getInitialState: function() {
    return {
      data: [],
      options: this.defaults,
      query: '',
      identifier: ''
    };
  },
  componentDidMount: function() {
    this.state.options = _.defaults(this.props.options, this.defaults);
    this.setState(this.state);
  },
  handleChange: function(e) {
    this.state.query = e.target.value;

    if (this.state.query === '') {
      this.state.data = [];
      this.setState(this.state);
      return;
    }

    $.get(this.state.options.url, {'q': this.state.query})
      .done(function(data) {
        this.state.data = this.state.options.data(data);
        this.setState(this.state);
      }.bind(this));
  },
  handleClick: function(identifier, label) {
    this.state.query = label;
    this.state.identifier = identifier;
    this.state.data = [];
    this.setState(this.state);
  },
  handleClear: function() {
    this.state.identifier = '';
    this.state.query = '';
    this.setState(this.state);
  },
  handleKeyDown: function(e) {
    if (e.keyCode === 13) {
      var result = this.state.data[0];
      if (result !== undefined) {
        var identifier = this.state.options.identifier(result);
        var label = this.state.options.label(result);
        this.handleClick(identifier, label);
      }
    }
  },
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'bp-typeahead': true,
      'bp-typeahead-selected': this.state.identifier !== ''
    });

    var results = this.state.data.map(function(obj) {
      var identifier = this.state.options.identifier(obj);
      var label = this.state.options.label(obj);
      return <TypeaheadResult identifier={identifier} onClick={this.handleClick}>{label}</TypeaheadResult>
    }.bind(this));

    return (
      <div className={classes}>
        <div className='bp-typeahead-clear' onClick={this.handleClear} />
        <input type='type' ref='query' onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder={this.props.placeholder} value={this.state.query} />
        <div className='bp-typeahead-results'>{results}</div>
      </div>
    );
  }
});


// MARK: Mention Field

var MentionField = React.createClass({
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
