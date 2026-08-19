// B02 Emergencias (lista simulada)
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockEmergencias, mockTiposEmergencia } from '../data/mocks';

export default function Emergencias() {
  return (
    <Screen title="Emergencias activas">
      {mockEmergencias.map((emergencia) => {
        const tipo = mockTiposEmergencia.find(
          (t) => t.id_tipo_emergencia === emergencia.id_tipo_emergencia
        );
        return (
          <Pressable
            key={emergencia.id_emergencia}
            style={styles.card}
            onPress={() =>
              router.push({ pathname: '/detalle', params: { id: emergencia.id_emergencia } })
            }
          >
            <Text style={styles.cardTitle}>
              {emergencia.codigo} · {tipo?.nombre}
            </Text>
            <Text>{emergencia.direccion_referencia}</Text>
            <Text style={styles.estado}>Estado: {emergencia.estado}</Text>
          </Pressable>
        );
      })}
      <ContinueButton
        href={{ pathname: '/detalle', params: { id: mockEmergencias[0].id_emergencia } }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginTop: 12,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  estado: {
    marginTop: 4,
    color: '#C0392B',
  },
});
