import React from 'react';

export default class Command extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: props.sh.resultOf(props.command),
    };
  }

  render() {
    return <div>
      $ { this.props.command }<br />
      <pre>
        { this.state.result }
      </pre>
    </div>;
  }
}
