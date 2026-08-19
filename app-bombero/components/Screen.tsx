import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

type ScreenProps = {
  title: string;
  children?: ReactNode;
};

export function Screen({ title, children }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

type ContinueButtonProps = {
  href: string | { pathname: string; params?: Record<string, string> };
  label?: string;
};

export function ContinueButton({ href, label = 'Continuar' }: ContinueButtonProps) {
  return (
    <Pressable style={styles.button} onPress={() => router.push(href as any)}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#C0392B',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
