import React, { Component } from 'react';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    playerName: '',
    playerEmail: '',
    isPlayDisabled: true,
  };

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    }, () => this.checkButton());
  }

  checkButton() {
    const { playerName, playerEmail } = this.state;

    const emailRegex = /\S+@\S+\.\S+/;
    const isNameValid = playerName.length;
    const isEmailValid = emailRegex.test(playerEmail);

    this.setState({
      isPlayDisabled: !(isEmailValid && isNameValid),
    });
  }

  render() {
    const { playerName, playerEmail, isPlayDisabled } = this.state;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <form>
          <input
            type="text"
            data-testid="input-player-name"
            name="playerName"
            placeholder="Nome"
            value={ playerName }
            onChange={ ({ target }) => this.handleChange(target) }
          />
          <input
            type="text"
            data-testid="input-gravatar-email"
            name="playerEmail"
            placeholder="e-mail"
            value={ playerEmail }
            onChange={ ({ target }) => this.handleChange(target) }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isPlayDisabled }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
