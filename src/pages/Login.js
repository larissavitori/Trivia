import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveProfile } from '../redux/actions';
import Logo from '../components/Logo';
import '../style/Login.css';
import '../style/button.css';

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

  handleClick() {
    const { history } = this.props;
    history.push('/settings');
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
      history.push('/game');
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
      <div className="main-container">
        <Logo />
        <form className="login-container">
          <input
            type="text"
            data-testid="input-player-name"
            name="playerName"
            placeholder="Qual o seu nome?"
            value={ playerName }
            onChange={ ({ target }) => this.handleChange(target) }
          />
          <input
            type="text"
            data-testid="input-gravatar-email"
            name="playerEmail"
            placeholder="Qual seu e-mail?"
            value={ playerEmail }
            onChange={ ({ target }) => this.handleChange(target) }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isPlayDisabled }
            onClick={ this.fetchRequest }
            className="primary button"
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.handleClick() }
            className="secondary button"
          >
            Configurações
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
