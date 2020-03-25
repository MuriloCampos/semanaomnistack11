import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import { Container, Form, StyledLink } from './styles';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function SignIn() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/perfil');
    } catch (err) {
      alert('Falha no login. Tente novamente.');
    }
  }

  return (
    <Container>
      <Form>
        <img src={logoImg} alt="Be the Hero" />

        <form onSubmit={handleSignIn}>
          <h1>Faça seu login</h1>

          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <button type="submit" className="button">
            Entrar
          </button>

          <StyledLink to="/cadastro">
            <FiLogIn size={16} color="#e02041" />
            Nao tenho cadastro
          </StyledLink>
        </form>
      </Form>

      <img src={heroesImg} alt="Heroes" />
    </Container>
  );
}
