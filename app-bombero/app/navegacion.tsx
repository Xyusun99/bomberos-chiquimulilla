// B04 En camino/navegación
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockEmergencias } from '../data/mocks';

export default function Navegacion() {
  const emergencia = mockEmergencias[0];

  return (
    <Screen title="En camino">
      <Text>Destino: {emergencia.direccion_referencia}</Text>
      <Text>Lat: {emergencia.latitud}</Text>
      <Text>Lng: {emergencia.longitud}</Text>
      <Text>Aquí irá el mapa de navegación en una fase posterior.</Text>
      <ContinueButton href="/en-sitio" />
    </Screen>
  );
}
