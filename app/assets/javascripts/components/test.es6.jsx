class Test extends React.Component {
  render () {
    return (
      <div>
          <Loader/>
        <div>Text: {this.props.text}</div>
      </div>
    );
  }
}

Test.propTypes = {
  text: React.PropTypes.string
};
