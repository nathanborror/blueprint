
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
  render: function() {
    return (
      <div className='bp-collection'>
        {this.props.children}
      </div>
    );
  }
});
