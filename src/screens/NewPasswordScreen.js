import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchData from "../utils/fetchData";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { DialogNotification, ToastNotification } from "../components/Alerts/AlertComponent";
import { LinearGradient } from 'expo-linear-gradient';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function NewPasswordScreen({ route }) {
  const { tokenV } = route.params; // Obtener el token de la ruta
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const USER_API = "services/admin/usuario.php";

  const validatePassword = (password) => {
    return /^(?=.*[a-zA-Z]).{8,}$/.test(password);
  };

  const handleSavePassword = async () => {
    if (newPassword !== confirmPassword) {
      ToastNotification(2, `Las contraseñas no coinciden.`, true);
    } else if (!validatePassword(newPassword)) {
      ToastNotification(2, `La contraseña debe tener al menos 8 caracteres y contener letras.`, true);
    } else {
      try {
        const form = new FormData();
        form.append("token", tokenV);
        form.append("nuevaClave", newPassword);
        form.append("confirmarClave", confirmPassword);

        const DATA = await fetchData(USER_API, "changePasswordByEmail", form);

        if (DATA.status) {
          setNewPassword('');
          setConfirmPassword('');
          ToastNotification(1, `${DATA.message}.`, true);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        } else {
          ToastNotification(2, `${DATA.error} ${DATA.exception}.`, true);

          if (DATA.error === "El tiempo para cambiar su contraseña ha expirado") {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      } catch (error) {
        ToastNotification(2, error.message, true);
      }
    }
  };

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back_arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <Image
            source={require('../../assets/password_icon.png')}
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
          
          <TouchableOpacity onPress={handleSavePassword}>
            <LinearGradient
              colors={['#1976D2', '#42A5F5']}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0356A2',
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
    width: windowWidth * 0.5,
    height: windowWidth * 0.15,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
