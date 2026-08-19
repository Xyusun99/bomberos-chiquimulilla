// B08 Evidencias
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';

export default function Evidencias() {
  return (
    <Screen title="Adjuntar evidencias">
      <Text>Aquí irá la captura/selección de fotos de evidencia en una fase posterior.</Text>
      <ContinueButton href="/finalizada" />
    </Screen>
  );
}
