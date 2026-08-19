// M04 Fotografía
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';

export default function Fotografia() {
  return (
    <Screen title="Agrega una fotografía (opcional)">
      <Text>Aquí irá la captura/selección de foto en una fase posterior.</Text>
      <ContinueButton href="/descripcion" />
    </Screen>
  );
}
