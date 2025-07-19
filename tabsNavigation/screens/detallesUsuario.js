import { View, Text, StyleSheet } from 'react-native';

export default function DetallesUsuario() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de Usuario</Text>
      <Text style={styles.subtitle}>Usando Navegación Stack</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'
  },
  title: {
    fontSize: 22, fontWeight: 'bold', color: 'black'
  },
  subtitle: {
    fontSize: 16, color: 'blue', marginTop: 10
  }
});
