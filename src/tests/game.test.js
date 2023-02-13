import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { fireEvent, getByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Game from '../pages/Game';
import App from '../App';

const validEmail =  "teste@teste.com";
const validName = "João";
describe('testando a tela de game', ()=>{
    it('Verifica se ao entrar na página tem os elementos do gravatar', () => {
        renderWithRouterAndRedux(<Game />);
    
        const gravatar = screen.getByRole('img', {
            name: /gravatar/i,
          });
          const name = screen.getByTestId('header-player-name');
          const pontos = screen.getByTestId('header-score');
        
        expect(gravatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(pontos).toBeInTheDocument();
      });
it('capturando o botão ', async ()=> {
      const {history} = renderWithRouterAndRedux(<App />);
        screen.findByTestId('question-text');
        screen.findByTestId('question-category');
    const playButton = screen.getByTestId("btn-play");
    const nameInput = screen.getByTestId("input-player-name");
    const emailInput = screen.getByTestId("input-gravatar-email");

    userEvent.type(nameInput, validName);
    userEvent.type(emailInput, validEmail);

    userEvent.click(playButton);
        // expect(history.location.pathname).toBe('/game');                       
       /*  await waitFor(() => {
            const bottonCorrect = screen.getByTestId('correct-answer');
            // expect(bottonCorrect).toBeInTheDocument();
        }, 4000); */
        userEvent.click( await screen.findByTestId('correct-answer'));
        userEvent.click( await screen.findByTestId('btn-next'));
        userEvent.click( await screen.findByTestId('btn-next'));
        userEvent.click( await screen.findByTestId('btn-next'));
        userEvent.click( await screen.findByTestId('btn-next'));
        userEvent.click( await screen.findByTestId('btn-next'));
    })
     it(' funcão' , async () => {
         const { history} = renderWithRouterAndRedux(<App />)
      jest.spyOn(global, 'fetch');

        global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(12)
        });; 

        const playButton = screen.getByTestId("btn-play");
        const nameInput = screen.getByTestId("input-player-name");
        const emailInput = screen.getByTestId("input-gravatar-email");

       userEvent.type(nameInput, validName);
       userEvent.type(emailInput, validEmail);

        userEvent.click(playButton);
         expect(global.fetch).toHaveBeenCalled();
        await waitFor(() => {
            const { pathname } = history.location;
            expect(pathname).not.toBe('/game')
        }, 500);
        console.log(history.location.pathname);
    }) 
});