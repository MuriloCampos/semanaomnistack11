import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, FlatList } from 'react-native';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';

import {
  Container,
  Header,
  HeaderText,
  HeaderTextBold,
  Title,
  Description,
  IncidentProperty,
  IncidentValue,
  Incident,
  DetailsButton,
  DetailsButtonText,
} from './styles';

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadIncidents() {
    if (loading) return;

    if (total > 0 && incidents.length === total) return;

    setLoading(true);

    const response = await api.get('casos', {
      params: { page },
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);

    setLoading(false);
    setPage(page + 1);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  return (
    <Container>
      <Header>
        <Image source={logoImg} />
        <HeaderText>
          Total de <HeaderTextBold>{total} casos.</HeaderTextBold>
        </HeaderText>
      </Header>

      <Title>Bem Vindo!</Title>

      <Description>Escolha um dos casos abaixo e salve o dia!</Description>

      <FlatList
        data={incidents}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <Incident>
            <IncidentProperty>ONG: </IncidentProperty>
            <IncidentValue>{incident.name}</IncidentValue>

            <IncidentProperty>CASO: </IncidentProperty>
            <IncidentValue>{incident.title}</IncidentValue>

            <IncidentProperty>VALOR: </IncidentProperty>
            <IncidentValue>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </IncidentValue>

            <DetailsButton onPress={() => navigateToDetail(incident)}>
              <DetailsButtonText>Ver mais detalhes</DetailsButtonText>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </DetailsButton>
          </Incident>
        )}
      />
    </Container>
  );
}
