// B07 Informe
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';

export default function Informe() {
  const [informe, setInforme] = useState('');

  return (
    <Screen title="Informe de la atención">
      <TextInput
        style={styles.input}
        multiline
        value={informe}
        onChangeText={setInforme}
        placeholder="Describe las acciones realizadas..."
      />
      <ContinueButton href="/evidencias" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    textAlignVertical: 'top',
  },
});
