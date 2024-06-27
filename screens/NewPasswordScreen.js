import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NewPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const validatePassword = (password) => {
    return /^(?=.*[a-zA-Z]).{8,}$/.test(password);
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
    } else if (!validatePassword(newPassword)) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres y contener mayúsculas o minúsculas.");
    } else {
      // Aquí puedes agregar la lógica para guardar la nueva contraseña
      Alert.alert("Éxito", "La contraseña ha sido actualizada.");
      // Navegar a la siguiente pantalla
      navigation.navigate('Login'); // Reemplaza 'NextScreen' con el nombre de tu siguiente pantalla
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/back_arrow.png')} // Reemplaza con la ruta de tu icono de flecha
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Image
          source={require('../../assets/password_icon.png')} // Reemplaza con la ruta de tu icono de contraseña
          style={styles.passwordIcon}
        />
        <Text style={styles.title}>Ingrese su nueva contraseña</Text>
        <Text style={styles.inputLabel}>Contraseña nueva:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={setNewPassword}
          value={newPassword}
        />
        <Text style={styles.inputLabel}>Confirmar contraseña:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSavePassword}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42a5f5',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
