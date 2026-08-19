// M02 Tipo de emergencia
import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockTiposEmergencia } from '../data/mocks';

export default function TipoEmergencia() {
  const [seleccionado, setSeleccionado] = useState(mockTiposEmergencia[0]?.id_tipo_emergencia);

  return (
    <Screen title="¿Qué tipo de emergencia es?">
      {mockTiposEmergencia.map((tipo) => (
        <Pressable
          key={tipo.id_tipo_emergencia}
          style={[
            styles.option,
            seleccionado === tipo.id_tipo_emergencia && styles.optionSelected,
          ]}
          onPress={() => setSeleccionado(tipo.id_tipo_emergencia)}
        >
          <Text style={styles.optionText}>{tipo.nombre}</Text>
        </Pressable>
      ))}
      <ContinueButton href="/ubicacion" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginTop: 12,
  },
  optionSelected: {
    borderColor: '#C0392B',
    backgroundColor: '#FDEDEC',
  },
  optionText: {
    fontSize: 16,
  },
});
