// M01 Inicio
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';

export default function Inicio() {
  return (
    <Screen title="Bomberos Chiquimulilla">
      <Text>Reporta una emergencia en pocos pasos.</Text>
      <ContinueButton href="/tipo-emergencia" />
    </Screen>
  );
}
