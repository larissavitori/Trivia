import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends Component {
  render() {
    const { name, email } = this.props;
    const hashGerada = md5(email).toString();
    const img = `https://www.gravatar.com/avatar/${hashGerada}`;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ img }
          className="gravatar"
          alt="gravatar"
        />
        <p data-testid="header-player-name">
          { name }
        </p>
        <h3 data-testid="header-score"> placar:0 </h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  email: state.playerReducer.email,
});
Game.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
