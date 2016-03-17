var React = require('react');
var PropTypes = React.PropTypes;

function puke(obj) {
  return <pre>{JSON.stringify(obj, null, ' ')}</pre>
}

function Results(props) {
  return (
    <div>Results {puke(props)}</div>
  )
}

Results.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  playersInfo: PropTypes.array.isRequired,
  score: PropTypes.array
}

module.exports = Results;