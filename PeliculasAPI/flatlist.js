import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SectionList,
  FlatList, // Importamos FlatList
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView, // Usamos SafeAreaView para evitar que el contenido se superponga con la barra de estado
  TouchableOpacity, // Para hacer botones
} from 'react-native';

const App = () => {    
  // Estado para los datos de SectionList
  const [secciones, setSecciones] = useState([]);
  // Nuevo estado para los datos de FlatList (una lista plana de todos los Pokémon)
  const [pokemonPlano, setPokemonPlano] = useState([]);
  // Estado para el indicador de carga
  const [cargando, setCargando] = useState(true);
  // Nuevo estado para controlar qué lista se muestra: 'section' o 'flat'
  const [tipoDeLista, setTipoDeLista] = useState('section');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Paso 1: Obtener los primeros 4 tipos de Pokémon
        const resTipos = await fetch('https://pokeapi.co/api/v2/type');
        const tiposData = await resTipos.json();
        const tiposLimitados = tiposData.results.slice(0, 18);

        // Paso 2: Procesar cada tipo para obtener sus Pokémon
        const seccionesFinales = await Promise.all(
          tiposLimitados.map(async (tipo) => {
            const resTipo = await fetch(tipo.url);
            const detalleTipo = await resTipo.json();
            
            // Limitar a los primeros 5 Pokémon de ese tipo
            const pokemons = detalleTipo.pokemon.slice(0, 15);

            // Obtener los detalles de cada Pokémon
            const datosPokemon = await Promise.all(
              pokemons.map(async ({ pokemon }) => {
                const resPoke = await fetch(pokemon.url);
                const dataPoke = await resPoke.json();
                return {
                  id: dataPoke.id,
                  name: dataPoke.name,
                  image: dataPoke.sprites.front_default,
                };
              })
            );

            return {
              title: tipo.name.charAt(0).toUpperCase() + tipo.name.slice(1),
              data: datosPokemon,
            };
          })
        );
        
        // Paso 3: Preparar los datos para ambas listas
        setSecciones(seccionesFinales);

        // Creamos una lista plana (un solo array) con todos los pokémon para el FlatList
        const todosLosPokemon = seccionesFinales.flatMap(seccion => seccion.data);
        setPokemonPlano(todosLosPokemon);

      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  // Componente reutilizable para renderizar cada Pokémon en la lista
  const renderItemPokemon = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.id.toString().padStart(3, '0')}</Text>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        // Imagen de fallback por si falla la carga
        defaultSource={{ uri: 'https://placehold.co/60x60/cccccc/ffffff?text=...' }}
      />
      <Text style={styles.name}>{item.name.toUpperCase()}</Text>
    </View>
  );

  // Si está cargando, mostramos un indicador
  if (cargando) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff5733" />
        <Text>Cargando Pokémon...</Text>
      </View>
    );
  }

  // Renderizado principal de la aplicación
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, tipoDeLista === 'section' && styles.switchButtonActive]}
          onPress={() => setTipoDeLista('section')}
        >
          <Text style={[styles.switchButtonText, tipoDeLista === 'section' && styles.switchButtonTextActive]}>
            Ver por Sección (SectionList)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, tipoDeLista === 'flat' && styles.switchButtonActive]}
          onPress={() => setTipoDeLista('flat')}
        >
          <Text style={[styles.switchButtonText, tipoDeLista === 'flat' && styles.switchButtonTextActive]}>
            Ver Lista Completa (FlatList)
          </Text>
        </TouchableOpacity>
      </View>


      {tipoDeLista === 'section' ? (
        // EJEMPLO DE SECTIONLIST
        <SectionList
          sections={secciones}
          keyExtractor={(item) => `section-${item.id.toString()}`}
          renderItem={renderItemPokemon}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>Tipo: {title}</Text>
          )}
          ListHeaderComponent={<Text style={styles.mainTitle}>Pokédex con SectionList</Text>}
        />
      ) : (
        // EJEMPLO DE FLATLIST
        <FlatList
          data={pokemonPlano}
          keyExtractor={(item) => `flat-${item.id.toString()}`}
          renderItem={renderItemPokemon}
          ListHeaderComponent={<Text style={styles.mainTitle}>Pokédex con FlatList</Text>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  switchButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff5733',
  },
  switchButtonActive: {
    backgroundColor: '#ff5733',
  },
  switchButtonText: {
    color: '#ff5733',
    fontWeight: '600',
  },
  switchButtonTextActive: {
    color: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    padding: 12,
    color: '#424242',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 30, // Hacemos la imagen circular
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
   // Para que el nombre ocupe el espacio restante
  },
});

export default App;