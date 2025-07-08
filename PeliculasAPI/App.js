import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

const API_KEY = 'c9856d0cb57c3f14bf75bdc6c063b8f3';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const App = () => {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [tipoBusqueda, setTipoBusqueda] = useState('aproximada'); 
  const [yaSeHizoBusqueda, setYaSeHizoBusqueda] = useState(false);

  const buscarPeliculas = async () => {
    if (!textoBusqueda.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre de una película');
      return;
    }

    if (!API_KEY || API_KEY === 'TU_API_KEY_AQUI') {
      Alert.alert(
        'API Key requerida',
        'Para usar esta aplicación, necesitas obtener una API key gratuita de TMDB:\n\n1. Ve a https://www.themoviedb.org/\n2. Crea una cuenta\n3. Ve a Settings > API\n4. Solicita una API key\n5. Reemplaza la API key en el código'
      );
      return;
    }

    setCargando(true);
    setYaSeHizoBusqueda(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(textoBusqueda)}&language=es-MX`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      let resultadosFiltrados = data.results || [];
      
      if (tipoBusqueda === 'exacta') {
        resultadosFiltrados = resultadosFiltrados.filter(pelicula => 
          pelicula.title.toLowerCase() === textoBusqueda.toLowerCase()
        );
      }
      
      setPeliculas(resultadosFiltrados);
      
    } catch (error) {
      console.error('Error al buscar películas:', error);
      Alert.alert(
        'Error de conexión',
        'No se pudo conectar con la API de TMDB. Verifica tu conexión a internet.'
      );
      setPeliculas([]);
    } finally {
      setCargando(false);
    }
  };

  // Función para limpiar la búsqueda
  const limpiarBusqueda = () => {
    setTextoBusqueda('');
    setPeliculas([]);
    setYaSeHizoBusqueda(false);
  };

  // Función para obtener el año de una fecha
  const obtenerAnio = (fecha) => {
    return fecha ? new Date(fecha).getFullYear() : 'N/A';
  };

  // Función para formatear el rating
  const formatearRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  // Componente para renderizar cada película
  const renderItemPelicula = ({ item }) => (
    <View style={styles.movieItem}>
      <View style={styles.movieImageContainer}>
        <Image
          source={{ 
            uri: item.poster_path 
              ? `${IMAGE_BASE_URL}${item.poster_path}`
              : 'https://via.placeholder.com/300x450/8B5CF6/ffffff?text=Sin+Imagen'
          }}
          style={styles.movieImage}
          defaultSource={{ uri: 'https://via.placeholder.com/300x450/8B5CF6/ffffff?text=Cargando...' }}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.ratingBadge}>⭐ {formatearRating(item.vote_average)}</Text>
        </View>
      </View>
      
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <View style={styles.movieMetadata}>
          <View style={styles.yearContainer}>
            <Text style={styles.yearLabel}>Año</Text>
            <Text style={styles.movieYear}>
              {obtenerAnio(item.release_date)}
            </Text>
          </View>
          
          <View style={styles.voteContainer}>
            <Text style={styles.voteLabel}>Votos</Text>
            <Text style={styles.movieVotes}>
              {item.vote_count || 0}
            </Text>
          </View>
        </View>
        
        <Text style={styles.movieOverview} numberOfLines={4}>
          {item.overview || 'Sin descripción disponible'}
        </Text>
        
        <View style={styles.genreContainer}>
          <Text style={styles.genreText}>TMDB ID: {item.id}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header con gradiente visual */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>CineSearch</Text>
          <Text style={styles.headerSubtitle}>Descubre tu próxima película favorita</Text>
        </View>
        <View style={styles.headerDecoration} />
      </View>

      {/* Sección de búsqueda moderna */}
      <View style={styles.searchSection}>
        
        {/* Campo de texto moderno */}
        <View style={styles.inputContainer}>
          <View style={styles.searchIconContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="¿Qué película buscas hoy?"
            placeholderTextColor="#A855F7"
            value={textoBusqueda}
            onChangeText={setTextoBusqueda}
            onSubmitEditing={buscarPeliculas}
            returnKeyType="search"
          />
        </View>

        {/* Selector de tipo de búsqueda con diseño moderno */}
        <View style={styles.searchTypeContainer}>
          <Text style={styles.searchTypeLabel}>Tipo de búsqueda</Text>
          <View style={styles.searchTypeButtons}>
            <TouchableOpacity
              style={[
                styles.searchTypeButton, 
                tipoBusqueda === 'aproximada' && styles.searchTypeButtonActive
              ]}
              onPress={() => setTipoBusqueda('aproximada')}
            >
              <Text style={[
                styles.searchTypeText, 
                tipoBusqueda === 'aproximada' && styles.searchTypeTextActive
              ]}>
                Aproximada
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.searchTypeButton, 
                tipoBusqueda === 'exacta' && styles.searchTypeButtonActive
              ]}
              onPress={() => setTipoBusqueda('exacta')}
            >
              <Text style={[
                styles.searchTypeText, 
                tipoBusqueda === 'exacta' && styles.searchTypeTextActive
              ]}>
                Exacta
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botones de acción con nuevo diseño */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.searchButton, cargando && styles.searchButtonDisabled]}
            onPress={buscarPeliculas}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.searchButtonText}>Buscar Películas</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.clearButton}
            onPress={limpiarBusqueda}
          >
            <Text style={styles.clearButtonText}>Limpiar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Indicador de carga mejorado */}
      {cargando && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#8B5CF6" />
            <Text style={styles.loadingText}>Explorando el universo cinematográfico...</Text>
            <View style={styles.loadingBar}>
              <View style={styles.loadingBarFill} />
            </View>
          </View>
        </View>
      )}

      {/* Lista de resultados con diseño card moderno */}
      {!cargando && yaSeHizoBusqueda && (
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              {peliculas.length === 0 
                ? 'Sin resultados' 
                : `${peliculas.length} película${peliculas.length !== 1 ? 's' : ''} encontrada${peliculas.length !== 1 ? 's' : ''}`
              }
            </Text>
            {peliculas.length > 0 && (
              <Text style={styles.resultsSubtitle}>
                Búsqueda: "{textoBusqueda}"
              </Text>
            )}
          </View>
          
          <FlatList
            data={peliculas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItemPelicula}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🎭</Text>
                <Text style={styles.emptyText}>
                  No encontramos películas con "{textoBusqueda}"
                </Text>
                <Text style={styles.emptySubtext}>
                  Intenta con otro término o usa búsqueda aproximada
                </Text>
              </View>
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  header: {
    backgroundColor: '#1A1A2E',
    paddingVertical: 30,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#8B5CF6',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: '#4C1D95',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#A855F7',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
    letterSpacing: 1,
  },
  headerDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#8B5CF6',
  },
  searchSection: {
    backgroundColor: '#16213E',
    padding: 25,
    margin: 20,
    borderRadius: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#4C1D95',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1A1A2E',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    overflow: 'hidden',
  },
  searchIconContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#8B5CF6',
  },
  searchIcon: {
    fontSize: 20,
    color: '#fff',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  searchTypeContainer: {
    marginBottom: 20,
  },
  searchTypeLabel: {
    fontSize: 14,
    color: '#A855F7',
    marginBottom: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  searchTypeButtons: {
    flexDirection: 'row',
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#4C1D95',
  },
  searchTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  searchTypeButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  searchTypeText: {
    color: '#A855F7',
    fontWeight: '600',
    fontSize: 14,
  },
  searchTypeTextActive: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  searchButton: {
    flex: 2,
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  searchButtonDisabled: {
    opacity: 0.7,
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#374151',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4C1D95',
  },
  clearButtonText: {
    color: '#A855F7',
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingContent: {
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    padding: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4C1D95',
    width: '100%',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#A855F7',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    marginTop: 20,
    overflow: 'hidden',
  },
  loadingBarFill: {
    height: '100%',
    width: '60%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  resultsHeader: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4C1D95',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B5CF6',
    textAlign: 'center',
    letterSpacing: 1,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#A855F7',
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  listContainer: {
    paddingBottom: 20,
  },
  separator: {
    height: 15,
  },
  movieItem: {
    flexDirection: 'row',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#4C1D95',
  },
  movieImageContainer: {
    marginRight: 16,
    position: 'relative',
  },
  movieImage: {
    width: 90,
    height: 135,
    borderRadius: 12,
    backgroundColor: '#374151',
  },
  imageOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingBadge: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    lineHeight: 22,
  },
  movieMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  yearContainer: {
    alignItems: 'center',
  },
  yearLabel: {
    fontSize: 11,
    color: '#A855F7',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  movieYear: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '700',
    marginTop: 2,
  },
  voteContainer: {
    alignItems: 'center',
  },
  voteLabel: {
    fontSize: 11,
    color: '#A855F7',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  movieVotes: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '700',
    marginTop: 2,
  },
  movieOverview: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
    marginBottom: 12,
  },
  genreContainer: {
    alignSelf: 'flex-start',
  },
  genreText: {
    fontSize: 12,
    color: '#A855F7',
    fontWeight: '500',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#8B5CF6',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#A855F7',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default App;