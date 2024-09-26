import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions
} from "react-native";
import fetchData from "../utils/fetchData";
import * as RNRestart from 'react-native-restart';
import 'intl-pluralrules';
import { useFocusEffect } from '@react-navigation/native';
import { AlertNotificationRoot } from "react-native-alert-notification";
import { DialogNotification, ToastNotification } from "../components/Alerts/AlertComponent";
import { LinearGradient } from 'expo-linear-gradient';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function LoginScreen({ navigation, logueado, setLogueado }) {
  //Constantes para el formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // URL de la API para el usuario
  const USER_API = "services/admin/usuario.php";

  // Función que ayuda a verificar si existe previamente una sesión abierta
  const verifyLogged = async () => {
    try {
      const data = await fetchData(USER_API, 'getUser');
      if (data.session) {
        console.log(data);
        setLogueado(true);
        //navigation.navigate("Home");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  // Función que ayuda a verificar si existe previamente una sesión abierta
  const verifyLoggedFirst = async () => {
    try {
      const data = await fetchData(USER_API, 'getUser');
      if (data.session) {
        console.log(data);
        //navigation.navigate("Home");
        setLogueado(true);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };



  useFocusEffect(
    useCallback(() => {
      verifyLoggedFirst();
    }, [])
  )

  useEffect(() => {
    verifyLoggedFirst();
  }, []);


  //Función para el manejo del inicio de sesión
  const handleLogin = async () => {
    if (username === "" || password === "") {
      ToastNotification(2, `Campos requeridos, Por favor, complete todos los campos.`, true);
    } else {
      try {
        // Creación del formulario para la petición
        const formData = new FormData();
        formData.append("correo", username);
        formData.append("clave", password);
        // Petición para iniciar sesión.
        const responseData = await fetchData(USER_API, 'logInMobile', formData);

        if (responseData.status) {
          ToastNotification(1, `${responseData.message}.`, true);
          setTimeout(() => {
            verifyLogged();
          }, 1500)
        }
        else {
          ToastNotification(2, `${responseData.error} ${responseData.exception}.`, true);
          console.log(responseData.error);
        }
      } catch (error) {
        ToastNotification(2, error.message, true);
        console.log(error);
      }
    }
  };

  // Manejo de cierre de sesión
  const handleLogOut = async () => {
    try {
      const data = await fetchData(USER_API, "logOut");
      if (data.status) {
        verifyLogged();
      } else {
        console.log("Error sesión: ", data.error);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //Función para pasar a la recuperación de contraseña
  const GoPassword = () => {
    navigation.navigate("VerifyEmail");
  };

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <Image
          source={require("../../assets/decoracion-arriba.png")} // Reemplaza con la ruta de tu logo
          style={styles.decoro}
        />
        <View style={styles.container2}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo_carga.png")} // Reemplaza con la ruta de tu logo
              style={styles.logo}
            />
          </View>
          <Text style={styles.title}>
            Ingrese sus credenciales para acceder al programa
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#000"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#000"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={GoPassword}>
              <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin}>
            <LinearGradient
              colors={['#1976D2', '#42A5F5']}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
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
    backgroundColor: "#003D74", // Color de fondo
  },
  container2: {
    marginTop: windowHeight * 0.15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003D74", // Color de fondo
    padding: 16,
  },
  logoContainer: {
    marginBottom: 20,
  },
  decoro: {
    marginTop: 25,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: windowWidth * 0.75,
    height: 40,
    backgroundColor: "#1BC8FF",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#000",
  },
  forgotPassword: {
    color: "#ffffff",
    fontSize: 14,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: windowWidth * 0.8
  },
  button: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.15,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    maxWidth: windowWidth * 0.3
  },
});
