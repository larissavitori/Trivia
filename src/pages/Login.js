import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveProfile } from '../redux/actions';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    playerName: '',
    playerEmail: '',
    isPlayDisabled: true,
    token: '',
  };

  handleChange({ name, value }) {
    this.setState(
      {
        [name]: value,
      },
      () => this.checkButton(),
    );
  }

  fetchRequest = async () => {
    const { dispatch, history } = this.props;
    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const data = await response.json();
    localStorage.setItem('token', data.token);
    this.setState({ token: data.token }, () => {
      dispatch(saveProfile(this.state));
      history.push('/jogo');
    });
  };

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
            onClick={ this.fetchRequest }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
