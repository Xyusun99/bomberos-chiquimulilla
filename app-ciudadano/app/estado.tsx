// M08 Estado
import { Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockEmergencias } from '../data/mocks';

const ETIQUETAS_ESTADO: Record<string, string> = {
  reportada: 'Reportada',
  en_camino: 'Unidad en camino',
  en_sitio: 'Unidad en el sitio',
  atendiendo: 'Atendiendo',
  finalizada: 'Finalizada',
};

export default function Estado() {
  const emergencia = mockEmergencias[0];

  return (
    <Screen title="Estado de tu reporte">
      <Text>Código: {emergencia.codigo}</Text>
      <Text>Estado: {ETIQUETAS_ESTADO[emergencia.estado]}</Text>
      <ContinueButton href="/" label="Volver al inicio" />
    </Screen>
  );
}
