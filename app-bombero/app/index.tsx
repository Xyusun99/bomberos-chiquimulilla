// B01 Inicio de sesión
import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { ContinueButton, Screen } from '../components/Screen';

export default function InicioSesion() {
  const [correo, setCorreo] = useState('carlos.ramirez@bomberos.gt');
  const [password, setPassword] = useState('');

  return (
    <Screen title="Inicio de sesión — Bombero">
      <Text>Correo</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
      />
      <Text>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <ContinueButton href="/emergencias" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    marginBottom: 12,
  },
});
