//--- IMPORTACIONES ---
import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    SafeAreaView,
    Platform
} from "react-native";

const App = () => {
    // --- PANTALLA DE CARGA ---
    const [loading, setLoading] = useState(true);
    useEffect ( ()=>{
        setTimeout(()=> setLoading(false), 3000);
    }, []);
    if (loading) {
        return(
            <View style={styles.splash}>
                <Text style={styles.splashText}>Cargando...</Text>
                <ActivityIndicator size="large" color="#ffffff"/>
            </View>
        );
    }

    // --- FORMULARIO ---
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telefono, setTelefono] = useState("");

    const mostrarAlerta = () => {
        if (!nombre || !email || !password){
            if (Platform.OS === 'web'){
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
                window.alert(`Registro exitoso: \n Nombre: ${nombre} \nEmail: ${email}`);
                limpiarFormulario();
            } else {
                Alert.alert(
                    "Registro exitoso",
                    `Nombre: ${nombre} \nEmail: ${email}`,
                    [{ text: "OK", onPress: () => limpiarFormulario() }]
                )
            }
        }

        const limpiarFormulario = () => {
            setNombre("");
            setEmail("");
            setPassword("");
            setTelefono("");
        };
    } 
    return (
        <SafeAreaView style = {styles.container}>  
            <View style={styles.formulario}>
                <Text style = {styles.titulo}> Registro de un usuario </Text>
                <TextInput
                    style = {styles.input}
                    placeholder = "Nombre completo *"
                    value = {nombre}
                    onChangeText={setNombre}
                />

                <TextInput
                    style = {styles.input}
                    placeholder = "Email *"
                    value = {email}
                    onChangeText={setEmail}
                    keyboardType="email-address" //Permite usar el simbolo '@' y el punto '.'
                    autoCapitalize="none" //Evita que se ponga la primera letra en mayúscula
                />

                <TextInput
                    style = {styles.input}
                    placeholder = "Contraseña *"
                    value = {password}
                    onChangeText={setPassword}
                    secureTextEntry //Permite ocultar la contraseña

                />

                <TextInput
                    style = {styles.input}
                    placeholder = "Teléfono (opcional)"
                    value = {telefono}
                    onChangeText={setTelefono}
                    keyboardType="phone-pad" //Permite usar el teclado numérico
                />

                <Button title="Registrarse" onPress={mostrarAlerta}/>

            </View>
        </SafeAreaView>
    );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
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
        fontSize : 20,
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
    splash:{
        flex: 1,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center'

    },
    splashText:{
        color: 'White',
        fontSize: 28,
        marginBottom: 20,
    }
}

);

export default App;