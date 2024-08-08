import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchData from "../utils/fetchData";

const VerifyEmailScreen = () => {
  const [correo, setCorreo] = useState('');
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handlePress = async () => {
    if (validateEmail(correo)) {
      const USER_API = "services/admin/usuario.php";
      try {
        // Creamos un FormData con el correo electrónico del usuario.
        const form = new FormData();
        form.append("usuario_correo", correo);

        // Hacemos una solicitud usando fetchData para enviar el correo electrónico y recibir una respuesta.
        const DATA = await fetchData(USER_API , "emailPasswordSender", form);

        // Si la solicitud es exitosa (DATA.status es verdadero), limpiamos el correo, mostramos una alerta y navegamos a la siguiente pantalla.
        if (DATA.status) {
          setCorreo("");
          Alert.alert("Éxito", "Un código de verificación ha sido enviado a su correo electrónico");
          const token = DATA.dataset;
          navigation.replace("CambioContra2", { token });
        } else {
          // En caso de error, mostramos un mensaje de error en una alerta.
          console.log(DATA);
          Alert.alert("Error sesión", DATA.error);
        }
      } catch (error) {
        // Capturamos y manejamos errores que puedan ocurrir durante la solicitud.
        console.error(error, "Error desde Catch");
        Alert.alert("Error", "Ocurrió un error al iniciar sesión");
      }
    } else {
      Alert.alert('Correo inválido', 'Por favor ingrese un correo electrónico válido.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0356A2" />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<-'}</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📧</Text>
      </View>
      <Text style={styles.title}>Ingrese su correo electrónico para verificar su cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#8a8a8a"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0356A2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    fontSize: 60,
    color: '#007bff',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VerifyEmailScreen;
