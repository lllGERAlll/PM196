import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Tralalero Tralala</Text>
      <StatusBar style="auto" />
      <Button title='Presioname'>
    </View>
  );
}

const Texto = () => {
  return (
    <Text>Hola Mundo</Text>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'marmol',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
