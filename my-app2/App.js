//1.- Importaciones
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

// Crear componente en base a uno ya creado
const Texto = (props) => {
  const {contenido} = props;
  return (
    <Text> {contenido} </Text>
  );
}

// 2.- Main
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Texto contenido="Hola"></Texto>
      <Texto contenido="Mundo"></Texto>
      <Texto contenido="React Native"></Texto>

      <Button title='Presioname'></Button>
    </View>
  );
}

// 3.- Estilos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'marmol',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
