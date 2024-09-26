import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  Image,
  Dimensions
} from "react-native";
import fetchData from "../utils/fetchData"; // Asegúrate de tener esta función implementada para manejar las solicitudes.
import { AlertNotificationRoot } from "react-native-alert-notification";
import { DialogNotification, ToastNotification } from "../components/Alerts/AlertComponent";
import { LinearGradient } from 'expo-linear-gradient';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function PasswordRecovery({ navigation }) {
  // Definimos los estados locales para manejar el correo y la visibilidad del teclado.
  const [correo, setCorreo] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const USER_API = "services/admin/usuario.php";

  // Función asincrónica para manejar el envío del correo de recuperación.
  const handleEmailSubmit = async () => {
    if (!correo) {
      ToastNotification(2, `Por favor ingrese su correo electrónico.`, true);
      return;
    } else {

      try {
        // Creamos un FormData con el correo electrónico.
        const form = new FormData();
        form.append("correo", correo);

        // Llamamos a la API para enviar el correo de recuperación.
        const DATA = await fetchData(USER_API, "emailPasswordSender", form);

        if (DATA.status) {
          setCorreo("");
          ToastNotification(1, `${DATA.message}.`, true);
          setTimeout(() => {
            const token = DATA.dataset;
            navigation.replace("VerifyCode", { token });
          }, 1500)
        } else {
          ToastNotification(2, `${DATA.error} ${DATA.exception}.`, true);
        }
      } catch (error) {
        console.log("Error desde Catch", error);
        ToastNotification(2, error.message, true);
      }
    }
  };

  // Manejamos la visibilidad del teclado con useEffect.
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    // Limpiamos los listeners al desmontar el componente.
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.mainContainer, keyboardVisible && { marginTop: -30 }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backText}>{"<"}</Text>
            </TouchableOpacity>

            <View style={styles.iconContainer}>
              <Image
                source={require("../../assets/email.png")} // Asegúrate de reemplazar la ruta de la imagen.
                style={styles.icon}
              />
            </View>

            <Text style={styles.title}>Ingrese su correo electrónico para verificar su cuenta</Text>

            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#000"
              keyboardType="email-address"
              value={correo}
              onChangeText={setCorreo}
            />

            <TouchableOpacity onPress={handleEmailSubmit}>
              <LinearGradient
                colors={['#1976D2', '#42A5F5']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Enviar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003D74",
    padding: 20,
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  backButton: {
    backgroundColor: "#42A5F5",
    position: "absolute",
    borderRadius: 50,
    padding: 10,
    top: 0,
    left: 20,
  },
  backText: {
    fontSize: 24,
    color: "#ffffff",
  },
  iconContainer: {
    marginTop: 80,
    marginBottom: 50,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#004e92",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 60,
    color: "#ffffff",
  },
  title: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "85%",
    height: 50,
    backgroundColor: "#1BC8FF",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
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
