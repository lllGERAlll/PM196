//1.- Importaciones
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react'; //Importacion de React y el hook useState

// Crear componente en base a uno ya creado
const Texto = () => {
  const [contenido, setContenido] = useState('Hola Mundo'); // Cuando arranca el componente, se inicializa con 'Hola Mundo'
  const actualizarTexto = () => {setContenido('State Modificado')};
  return (
    <Text onPress={actualizarTexto}> {contenido} </Text>
  );
}

// 2.- Main
export default function App() {

const [titulo, setTitulo] = useState('PRESIONAME');
const cambiarTitulo = () => {setTitulo('ME PRESIONASTE')};

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Texto> "Hola" </Texto>
      <Texto> "Mundo" </Texto>
      <Texto> React Native</Texto>

      <Button title={titulo} onPress={cambiarTitulo}></Button>

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
