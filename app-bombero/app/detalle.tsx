// B03 Detalle
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockEmergencias, mockTiposEmergencia } from '../data/mocks';

export default function Detalle() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const emergencia = mockEmergencias.find((e) => e.id_emergencia === id) ?? mockEmergencias[0];
  const tipo = mockTiposEmergencia.find(
    (t) => t.id_tipo_emergencia === emergencia.id_tipo_emergencia
  );

  return (
    <Screen title={`Detalle ${emergencia.codigo}`}>
      <Text>Tipo: {tipo?.nombre}</Text>
      <Text>Descripción: {emergencia.descripcion}</Text>
      <Text>Referencia: {emergencia.direccion_referencia}</Text>
      <Text>Teléfono de contacto: {emergencia.telefono_contacto}</Text>
      <Text>Estado: {emergencia.estado}</Text>
      <ContinueButton href="/navegacion" />
    </Screen>
  );
}
