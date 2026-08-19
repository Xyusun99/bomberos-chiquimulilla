// M03 Ubicación
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockEmergencias } from '../data/mocks';

export default function Ubicacion() {
  const { latitud, longitud, direccion_referencia } = mockEmergencias[0];

  return (
    <Screen title="Confirma tu ubicación">
      <Text>Lat: {latitud}</Text>
      <Text>Lng: {longitud}</Text>
      <Text>Referencia: {direccion_referencia}</Text>
      <ContinueButton href="/fotografia" />
    </Screen>
  );
}
