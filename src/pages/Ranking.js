import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.getRanking();
  }

  getRanking = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking,
    });
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          ranking.map((player, index) => (
            <div key={ index }>
              <img src={ player.image } alt={ player.name } />
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            </div>
          ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
