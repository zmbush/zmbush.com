import React from 'react';
import update from 'immutability-helper';
import Command from 'shell/Command';
import Sh from 'shell/sh';

export default class Shell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousCommands: [],
      input: "",
      sh: new Sh(),
    };
  }

  componentWillMount() {
    document.addEventListener("keypress", this.handleKeyPress.bind(this));
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress.bind(this));
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  handleKeyPress(e) {
    switch (e.which) {
      case 8:
        return false;
      case 13:
        this.setState(update(this.state, {
          previousCommands: {$push: [this.state.input]},
          input: {$set: ""},
        }));
        break;
      default:
        this.setState({
          input: this.state.input + String.fromCharCode(e.which)
        });
    }
  }

  handleKeyDown(e) {
    switch (e.which) {
      case 8:
        const input = this.state.input;
        if (input.length > 0) {
          this.setState({
            input: input.substring(0, input.length - 1)
          })
        }
    }
  }

  render() {
    return <div>
      { this.state.previousCommands.map((c, i) => (
        <Command
          key={ i }
          sh={ this.state.sh }
          command={ c } />
      )) }
      $ { this.state.input }
    </div>;
  }
}
