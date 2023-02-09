import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';

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
});
