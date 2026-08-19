// M07 Emergencia recibida
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockEmergencias } from '../data/mocks';

export default function EmergenciaRecibida() {
  const emergencia = mockEmergencias[0];

  return (
    <Screen title="¡Emergencia recibida!">
      <Text>Código de seguimiento: {emergencia.codigo}</Text>
      <Text>Estado actual: {emergencia.estado}</Text>
      <ContinueButton href="/estado" />
    </Screen>
  );
}
