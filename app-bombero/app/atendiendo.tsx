// B06 Atendiendo
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockEmergencias } from '../data/mocks';

export default function Atendiendo() {
  const emergencia = mockEmergencias[0];

  return (
    <Screen title="Atendiendo la emergencia">
      <Text>Código: {emergencia.codigo}</Text>
      <Text>Descripción: {emergencia.descripcion}</Text>
      <ContinueButton href="/informe" />
    </Screen>
  );
}
