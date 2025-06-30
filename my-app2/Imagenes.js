import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, ActivityIndicator } from 'react-native';


export default function App() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 6000);
    }, []);

    if (loading) {
        return (
            <View style={styles.splash}>
                <Text style={styles.splashText}>Cargando...</Text>
                <ActivityIndicator size="large" color="#ffffff"/>
            </View>
        );
    }

    return (
    <ImageBackground
    source={{uri:'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}}
    style={styles.background}
    resizeMode='cover'
    >
        <View style={styles.overlay}>
            <Text style={styles.text}>Bienvenido a la app</Text>

        </View>
    </ImageBackground>
);
}
//Estilos
const styles = StyleSheet.create({
    splash:{
        flex: 1,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center'
    },

    splashText: {
        color: 'white',
        fontSize: 28,
        marginBottom: 20
    },

    background: {
        flex:1,
        justifyContent: 'center'
    },
    overlay:{
        backgroundColor: 'rgba(0,0,0,0.5',
        padding: 20,
        borderRadius: 10,
        alignSelf: 'center'
    },
    text: {
        color: 'white',
        fontSize: 24
    }

})