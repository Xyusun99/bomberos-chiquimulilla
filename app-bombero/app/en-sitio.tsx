// B05 En sitio
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockEmergencias } from '../data/mocks';

export default function EnSitio() {
  const emergencia = mockEmergencias[0];

  return (
    <Screen title="Confirmar llegada al sitio">
      <Text>Código: {emergencia.codigo}</Text>
      <Text>Referencia: {emergencia.direccion_referencia}</Text>
      <ContinueButton href="/atendiendo" />
    </Screen>
  );
}
