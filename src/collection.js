
var Cell = React.createClass({
  render: function() {
    return (
      <div className='bp-cell' onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
});

var Section = React.createClass({
  render: function() {
    return (
      <div className='bp-section'>
        {this.props.title}
      </div>
    );
  }
});

var Collection = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    // Implement
  },
  handleClick: function() {
    // Implement
  },
  render: function() {
    var cells = this.state.data.map(function(obj) {
      return <Cell key={obj.key} onClick={this.handleClick}>{obj.title}</Cell>
    }.bind(this));

    return (
      <div className='bp-collection'>
        {cells}
      </div>
    );
  }
});
