import React, { useState, useEffect } from "react";
import { 
    View, 
    Switch, 
    StyleSheet, 
    Text, 
    ImageBackground, 
    ActivityIndicator,
    TextInput,
    Button,
    Alert,
    SafeAreaView,
    Platform
} from "react-native";

const App = () => {
    // --- PANTALLA DE CARGA ---
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000);
    }, []);

    // --- FORMULARIO ---
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telefono, setTelefono] = useState("");

    const limpiarFormulario = () => {
        setNombre("");
        setEmail("");
        setPassword("");
        setTelefono("");
    };

    const mostrarAlerta = () => {
        if (!nombre || !email || !password) {
            if (Platform.OS === 'web') {
                window.alert("Por favor, completa todos los campos obligatorios.");
            } else {
                Alert.alert(
                    "Error",
                    "Por favor, completa todos los campos obligatorios.",
                    [{ text: "OK" }]
                );
            }
        } else {
            if (Platform.OS === 'web') {
                window.alert(`Registro exitoso: \nNombre: ${nombre}\nEmail: ${email}`);
                limpiarFormulario();
            } else {
                Alert.alert(
                    "Registro exitoso",
                    `Nombre: ${nombre}\nEmail: ${email}`,
                    [{ text: "OK", onPress: () => limpiarFormulario() }]
                );
            }
        }
    };

    if (loading) {
        return (
            <View style={styles.splash}>
                <ImageBackground
                    source={{ uri: 'my-app2\assets\adaptive-icon.png' }}
                    style={styles.logo}
                    resizeMode="cover"
                ></ImageBackground>
                <Text style={styles.splashText}>Cargando...</Text>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <ImageBackground 
            source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>  
                <View style={styles.formulario}>
                    <Text style={styles.titulo}>Registro de un usuario</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre completo *"
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email *"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña *"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Teléfono (opcional)"
                        value={telefono}
                        onChangeText={setTelefono}
                        keyboardType="phone-pad"
                    />

                    <Button title="Registrarse" onPress={mostrarAlerta} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center'
    },
    splashText: {
        color: 'white',
        fontSize: 28,
        marginBottom: 20,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    formulario: {
        backgroundColor: "#f5f5f5",
        padding: 20,
        borderRadius: 10,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "grey",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: "white",
    },
    logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain'
}
});

export default App;
