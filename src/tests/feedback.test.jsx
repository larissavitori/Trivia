import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Feedback from '../pages/Feedback';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testes na tela de Feedeback', () => {
    it('Renderizacao de componentes', () =>{
        renderWithRouterAndRedux(<Feedback />);

        const playerImg = screen.getByTestId("header-profile-picture");
        const playerName = screen.getByTestId("header-player-name");
        const playerScore = screen.getByTestId("header-score");
        const gameFeedback = screen.getByTestId("feedback-text");
        const gameTotalScore = screen.getByTestId("feedback-total-score");
        const gameTotalQuestion = screen.getByTestId("feedback-total-question");
        const allBtn = screen.getAllByRole('button');

        expect(playerImg).toBeInTheDocument();
        expect(playerName).toBeInTheDocument();
        expect(playerScore).toBeInTheDocument();
        expect(gameFeedback).toBeInTheDocument();
        expect(gameFeedback.innerHTML).toBe('Could be better...');
        expect(gameTotalScore).toBeInTheDocument();
        expect(Number(gameTotalScore.innerHTML)).toBe(0);
        expect(gameTotalQuestion).toBeInTheDocument();
        expect(Number(gameTotalQuestion.innerHTML)).toBe(0)
        expect(allBtn).toHaveLength(2);
    })

    it('Testa botao "Jogar Novamente"', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
          history.push('/feedback');
        })
        expect(history.location.pathname).toBe('/feedback');
        await waitFor(() => {
            const playAgain = screen.getByTestId('btn-play-again');
            userEvent.click(playAgain);
            expect(history.location.pathname).toBe('/')
          }, 3000);
      });

      // PRECISA DO REQUISITO 16
      it('Testa botao "Ver ranking"', () => {});

      it('Testa resultados ta Trivia', async () => {
        const { store, history } = renderWithRouterAndRedux(<App />);
        store.getState().player.assertions = 5;
        act(() => {
            history.push('/feedback');
        });
        await waitFor(() => {
            const gameFeedback = screen.getByTestId('feedback-text');
            expect(gameFeedback).toHaveTextContent('Well Done!');
          }, 3000);
      })
})