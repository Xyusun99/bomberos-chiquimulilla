// M06 Confirmación
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockEmergencias, mockTiposEmergencia } from '../data/mocks';

export default function Confirmacion() {
  const emergencia = mockEmergencias[0];
  const tipo = mockTiposEmergencia.find(
    (t) => t.id_tipo_emergencia === emergencia.id_tipo_emergencia
  );

  return (
    <Screen title="Confirma los datos">
      <Text>Tipo: {tipo?.nombre}</Text>
      <Text>Descripción: {emergencia.descripcion}</Text>
      <Text>Referencia: {emergencia.direccion_referencia}</Text>
      <ContinueButton href="/emergencia-recibida" />
    </Screen>
  );
}
