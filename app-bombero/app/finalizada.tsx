// B09 Finalizada
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockEmergencias } from '../data/mocks';

export default function Finalizada() {
  const emergencia = mockEmergencias[0];

  return (
    <Screen title="Emergencia finalizada">
      <Text>Código: {emergencia.codigo}</Text>
      <Text>Estado: finalizada</Text>
      <ContinueButton href="/emergencias" label="Volver a emergencias" />
    </Screen>
  );
}
