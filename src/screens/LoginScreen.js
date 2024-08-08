import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import BottomTab from "../navegation/BottonTab";
import fetchData from "../utils/fetchData";

export default function LoginScreen({ navigation }) {
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
        navigation.navigate("Home");
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
        navigation.navigate("Home");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    verifyLoggedFirst();
  }, []);

  //Función para el manejo del inicio de sesión
  const handleLogin = async () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Por favor, complete todos los campos");
    } else {
      try{
      // Creación del formulario para la petición
      const formData = new FormData();
      formData.append("correo", username);
      formData.append("clave", password);
      // Petición para iniciar sesión.
      const responseData = await fetchData(USER_API, 'logIn', formData);
      
      if (responseData.status) {
        Alert.alert(responseData.message);
        setTimeout(()=>{
          verifyLogged();
        }, 1500)
      }
      else {
        Alert.alert("Error", responseData.error);
        console.log(responseData.error);
        handleLogOut();
      }
      }catch(error){
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
    navigation.navigate("Pass");
  };

  return (
    <View style={styles.container}>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004A8D", // Color de fondo
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
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#3388ff",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#ffffff",
  },
  forgotPassword: {
    color: "#ffffff",
    fontSize: 14,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#00ccff",
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
