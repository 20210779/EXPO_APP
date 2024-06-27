import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Alert } from 'react-native';
import BottomTab from '../navegation/BottonTab';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Por favor, complete todos los campos');
    } else {
      navigation.navigate('Home');
    }
  }

  const GoPassword = () =>{
    navigation.navigate("Pass");
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Image
          source={require('../../assets/logo_carga.png')}  // Reemplaza con la ruta de tu logo
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Ingrese sus credenciales para acceder al programa</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#ffffff"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#ffffff"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={GoPassword}>
      <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004A8D', // Color de fondo
    padding: 16,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#3388ff',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#ffffff',
  },
  forgotPassword: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#00ccff',
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
