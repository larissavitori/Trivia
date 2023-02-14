import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import Game from '../pages/Game';
import App from '../App';

const validEmail = "teste@teste.com";
const validName = "João";

const INITIAL_STATE = {
  player: {
    token: '',
    name: '',
    email: '',
    score: 0,
    assertions: 4,
  }
};

describe('testando a tela de game', () => {
  it('Verifica se ao entrar na página tem os elementos do gravatar', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
  
    const gravatar = screen.getByRole('img', {
      name: /gravatar/i,
      });
    const name = screen.getByTestId('header-player-name');
    const pontos = screen.getByTestId('header-score');
    
    expect(gravatar).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(pontos).toBeInTheDocument();
  });

  it('Teste da jornada do usuário até o final e reiniciando um novo jogo', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    const playButton = screen.getByTestId("btn-play");
    const nameInput = screen.getByTestId("input-player-name");
    const emailInput = screen.getByTestId("input-gravatar-email");

    userEvent.type(nameInput, validName);
    userEvent.type(emailInput, validEmail);

    userEvent.click(playButton);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game');
      expect(screen.getByTestId('timer').textContent).toBe("Tempo: 29s");
    }, { timeout: 4000 })
    
    const correctAnswer = await screen.findByTestId('correct-answer')
    
    expect(correctAnswer).toBeInTheDocument();
    userEvent.click(correctAnswer);

    expect(await screen.findByTestId('btn-next')).toBeInTheDocument();

    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(screen.getByTestId('btn-next'));
    userEvent.click(screen.getByTestId('btn-next'));
    userEvent.click(screen.getByTestId('btn-next'));
    userEvent.click(screen.getByTestId('btn-next'));

    expect(history.location.pathname).toBe('/feedback');

    userEvent.click(screen.getByTestId('btn-play-again'));
    expect(history.location.pathname).toBe('/')
    // act(() => {
    //   history.push('/feedback')
    // })
    // userEvent.click(screen.getByTestId('btn-ranking'))
    // expect(history.location.pathname).toBe('/ranking')
  });

  it('Teste da jornada do usuário até o final e reiniciando um novo jogo', async () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/')
    
    const playButton = screen.getByTestId("btn-play");
    const nameInput = screen.getByTestId("input-player-name");
    const emailInput = screen.getByTestId("input-gravatar-email");

    userEvent.type(nameInput, validName);
    userEvent.type(emailInput, validEmail);

    userEvent.click(playButton);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game'); 
    }, { timeout: 4000 })
    
    const correctAnswer = await screen.findByTestId('correct-answer')
    
    expect(correctAnswer).toBeInTheDocument();
    userEvent.click(correctAnswer);

    expect(await screen.findByTestId('btn-next')).toBeInTheDocument();

    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(screen.getByTestId('btn-next'));
    userEvent.click(screen.getByTestId('btn-next'));
    userEvent.click(screen.getByTestId('btn-next'));
    userEvent.click(screen.getByTestId('btn-next'));

    expect(history.location.pathname).toBe('/feedback');

    userEvent.click(screen.getByTestId('btn-ranking'));
    expect(history.location.pathname).toBe('/ranking')
  });
});
