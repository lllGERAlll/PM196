import React, {useEffect, useSate} from 'react'
import { View, StyleSheet, Text, ImageBackground, ActivityIndicator } from 'react-native'

export default function App(){
    return(
        <ImageBackground
        source={{uri: 'https:/images.unsplash.com/photo-1506744038136-46273834b3fb'}}
        style={styles.background}
        resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.text}>Bienvenidos a la App</Text>
            </View>
        </ImageBackground>
    )
}

// --- ESTILOS ---
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
        borderRadius: 10,
        alignSelf: 'center'
    },
    text: {
        color: 'white',
        fontSize: 24
    }
});