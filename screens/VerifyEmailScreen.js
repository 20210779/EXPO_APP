// src/screens/VerifyEmailScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerifyEmailScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handlePress = () => {
    if (validateEmail(email)) {
      // Navegar a la siguiente pantalla si el correo es válido
      navigation.navigate('VerifyCodeScreen'); // Reemplaza 'NextScreen' con el nombre de tu próxima pantalla
    } else {
      Alert.alert('Correo inválido', 'Por favor ingrese un correo electrónico válido.');
    }
  };

  return (
    <View style={styles.container}>
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
        value={email}
        onChangeText={setEmail}
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
    backgroundColor: '#e6f7ff',
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
    color: '#007bff',
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
    color: '#007bff',
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
