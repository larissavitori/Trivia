import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';

import App from '../App';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';

const validEmail =  "teste@teste.com";
const invalidEmail = "teste@teste.";
const validName = "João";

describe('Testes referente a página de Login', () => {
  it('Verifica se ao entrar na página o botão está inativo', () => {
    renderWithRouterAndRedux(<App />);

    const playButton = screen.getByTestId("btn-play");
    
    expect(playButton).toBeDisabled();
  });
  
  it('Verifica se o botão fica válido quando os inputs são corretos e ao clicar', () => {
    renderWithRouterAndRedux(<App />);

    const playButton = screen.getByTestId("btn-play");
    const nameInput = screen.getByTestId("input-player-name");
    const emailInput = screen.getByTestId("input-gravatar-email");

    userEvent.type(nameInput, validName);
    userEvent.type(emailInput, validEmail);

    expect(playButton).toBeEnabled();
  })

  it('Verifica se ao clicar no botão "Play", ', () => {
   const { history } =  renderWithRouterAndRedux(<App />);

    const settingButton = screen.getByTestId("btn-settings");

    userEvent.click(settingButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });

  it('testa se ao clicar em "Play" é feita uma requisição externa e redireciona a pagina de jogo', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(''),
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
      expect(pathname).toBe('/game')
    }, { timeout: 500 });
  })
});
