// IMPORTACIONES
import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';

// MAIN
const App = () => {
  const [activo, setActivo] = useState(false);

  const cambiarSwitch = () => {setActivo(previousState => !previousState)} 
  return(
    <View style={styles.container}>
      <Text style={styles.label}>Activar Característica:</Text>

      <Switch
        onValueChange={cambiarSwitch} 
        value={activo}
        //disabled={true}
        //trackColor={{ false: '#FF0000', true: '#00FF00' }}
        //thumbColor={activo ? '#0000FF' : '#FFFF00'}
        //ios_backgroundColor="#3e3e3e"
      />

      <Text style={styles.statusText}>Estado actual: {activo ? 'Activado' : 'Desactivado'}</Text>
    </View>
  );
};

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,                 
    justifyContent: 'center', 
    alignItems: 'center',  
    backgroundColor: '#f0f0f0', 
  },
  label: {
    fontSize: 20,           
    marginBottom: 10,       
    fontWeight: 'bold',     
    color: '#333',          
  },
  statusText: {
    marginTop: 20,         
    fontSize: 18,           
    color: '#666',          
  },
});

export default App;