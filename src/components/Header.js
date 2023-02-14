import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../style/Header.css';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const hashGerada = md5(email).toString();
    const img = `https://www.gravatar.com/avatar/${hashGerada}`;
    return (
      <div className="header-container">
        <div className="header-wrapper">
          <img
            data-testid="header-profile-picture"
            src={ img }
            className="gravatar"
            alt="gravatar"
          />
          <p data-testid="header-player-name">{name}</p>
        </div>

        <h3>
          Pontos:
          {' '}
          <span className="star">&#11088;</span>
          {' '}
          <span data-testid="header-score">{score}</span>
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
