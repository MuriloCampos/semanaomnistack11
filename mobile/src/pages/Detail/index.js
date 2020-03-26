import React from 'react';
import { TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import {
  Container,
  Header,
  Incident,
  IncidentProperty,
  IncidentValue,
  Contact,
  HeroTitle,
  HeroDescription,
  Actions,
  Action,
  ActionText,
} from './styles';

export default function Detail() {
  const route = useRoute();
  const { incident } = route.params;
  const navigation = useNavigation();

  const message = `Ola ${
    incident.name
  }, estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(incident.value)}`;

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <Container>
      <Header>
        <Image source={logoImg} />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </Header>

      <Incident>
        <IncidentProperty style={{ marginTop: 0 }}>ONG: </IncidentProperty>
        <IncidentValue>
          {incident.name} de {incident.city}/{incident.fu}
        </IncidentValue>

        <IncidentProperty>CASO: </IncidentProperty>
        <IncidentValue>{incident.title}</IncidentValue>

        <IncidentProperty>VALOR: </IncidentProperty>
        <IncidentValue>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(incident.value)}
        </IncidentValue>
      </Incident>

      <Contact>
        <HeroTitle>Salve o dia!</HeroTitle>
        <HeroTitle>Seja o heroi deste caso.</HeroTitle>

        <HeroDescription>Entre em contato:</HeroDescription>

        <Actions>
          <Action onPress={sendWhatsApp}>
            <ActionText>WhatsApp</ActionText>
          </Action>

          <Action onPress={sendMail}>
            <ActionText>Email</ActionText>
          </Action>
        </Actions>
      </Contact>
    </Container>
  );
}
