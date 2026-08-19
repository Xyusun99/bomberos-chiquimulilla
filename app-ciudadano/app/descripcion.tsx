// M05 Descripción
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';
import { mockEmergencias } from '../data/mocks';

export default function Descripcion() {
  const [descripcion, setDescripcion] = useState(mockEmergencias[0].descripcion);

  return (
    <Screen title="Describe la emergencia">
      <TextInput
        style={styles.input}
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Describe lo que está pasando..."
      />
      <ContinueButton href="/confirmacion" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
