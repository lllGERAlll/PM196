//1.- Importaciones
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

// Crear componente en base a uno ya creado
const Texto = (props) => {
  const {children} = props;
  return (
    <Text> {children} </Text>
  );
}

// 2.- Main
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Texto> "Hola" </Texto>
      <Texto> "Mundo" </Texto>
      <Texto> React Native</Texto>

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
