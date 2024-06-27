import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VerifyCodeScreen() {
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const handleVerifyCode = () => {
    if (code.length === 6) {
      // Aquí puedes agregar la lógica de verificación del código
      Alert.alert("Código Verificado", "El código ingresado es correcto.");
      // Navegar a la siguiente pantalla
      navigation.navigate('NewPasswordScreen'); // Reemplaza 'NextScreen' con el nombre de tu siguiente pantalla
    } else {
      Alert.alert("Error", "Por favor, ingrese un código de 6 dígitos.");
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
          source={require('../../assets/lock_icon.png')} // Reemplaza con la ruta de tu icono de candado
          style={styles.lockIcon}
        />
        <Text style={styles.title}>Ingrese el código enviado a su correo electrónico</Text>
        <Text style={styles.inputLabel}>Ingresar código</Text>
        <View style={styles.codeInputContainer}>
          {[...Array(6)].map((_, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => {
                const newCode = code.split('');
                newCode[index] = text;
                setCode(newCode.join(''));
              }}
              value={code[index] || ''}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
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
  lockIcon: {
    width: 200,
    height: 200,
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
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 40,
    marginLeft: 4,
    marginStart: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
