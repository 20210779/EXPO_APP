import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fetchData from "../utils/fetchData";
import { LinearGradient } from 'expo-linear-gradient';
import { AlertNotificationRoot } from "react-native-alert-notification";
import { DialogNotification, ToastNotification } from "../components/Alerts/AlertComponent";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function Sesion({ route }) {
  const { token } = route.params;
  console.log('Token enviado entre rutas', token);
  const [codigo, setCodigo] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputsRef = useRef([]);

  const USER_API = "services/admin/usuario.php";
  const navigation = useNavigation();

  const handlerEmailVerification = async () => {
    try {
      console.log('codigo: ', codigo);
      const form = new FormData();
      form.append("token", token);
      form.append("codigo_secret", codigo);

      const DATA = await fetchData(USER_API, "emailPasswordValidator", form);
      if (DATA.status) {
        setCodigo("");
        ToastNotification(1, `${DATA.message}.`, true);
        const tokenV = DATA.dataset;
        navigation.replace("NewPassword", { tokenV });
      } else {
        console.log(DATA);
        ToastNotification(2, `${DATA.error} ${DATA.exception}.`, true);
      }
    } catch (error) {
      console.log(error, "Error desde Catch codi");
      ToastNotification(2, error.message, true);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCodeChange = (index, value) => {
    const newCode = codigo.split('');
    newCode[index] = value;
    setCodigo(newCode.join(''));

    if (value && index < 7 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <View style={[styles.mainContainer, keyboardVisible && { marginTop: -30 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>{"<"}</Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/lock_icon.png")} // Reemplaza con tu ruta de imagen de candado
            style={styles.icon}
          />

          <Text style={styles.title}>Ingrese el código enviado a su correo electrónico</Text>

          <View style={styles.codeInputContainer}>
            {[...Array(8)].map((_, index) => (
              <TextInput
                key={index}
                ref={(input) => inputsRef.current[index] = input}
                style={styles.codeInput}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text) => handleCodeChange(index, text)}
                value={codigo[index] || ''}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <TouchableOpacity onPress={handlerEmailVerification}>
            <LinearGradient
              colors={['#1976D2', '#42A5F5']}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Enviar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0356A2',
    alignItems: "center",
    padding: 25,
  },
  mainContainer: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    paddingTop: windowHeight * 0.15,
  },
  backButton: {
    backgroundColor: "#1CC8FF",
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
  icon: {
    width: 100,
    height: 100,
    marginVertical: 30,
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0356A2',
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
