import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import { Container, Content, StyledLink, InputGroup } from './styles';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [fu, setFu] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = { name, email, whatsapp, city, fu };

    try {
      const response = await api.post('ongs', data);

      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }
  return (
    <Container>
      <Content>
        <div>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            casos da sua ONG.
          </p>

          <StyledLink to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Já tenho cadastro
          </StyledLink>
        </div>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <InputGroup>
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={fu}
              onChange={(e) => setFu(e.target.value)}
            />
          </InputGroup>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </Content>
    </Container>
  );
}
