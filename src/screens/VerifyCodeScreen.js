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
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fetchData from "../utils/fetchData";

export default function Sesion({ route }) {
  const { token } = route.params;
  const [codigo, setCodigo] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputsRef = useRef([]);

  const USER_API = "services/admin/usuario.php";
  const navigation = useNavigation();

  const handlerEmailVerification = async () => {
    try {
      const form = new FormData();
      form.append("token", token);
      form.append("codigoSecretoContraseña", codigo);
      
      const DATA = await fetchData(USER_API, "emailPasswordValidator", form);
      if (DATA.status) {
        setCodigo("");
        Alert.alert("Éxito", "Verificación Correcta");
        const tokenV = DATA.dataset;
        navigation.replace("NewPassword", { tokenV });
      } else {
        console.log(DATA);
        Alert.alert("Error sesión", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch codi");
      Alert.alert("Error", "Ocurrió un error al iniciar sesión");
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
    
    if (value && index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.mainContainer, keyboardVisible && { marginTop: -30 }]}>
          <Text style={styles.title}>Ingrese el código enviado a su correo electrónico</Text>
          
          <View style={styles.codeInputContainer}>
            {[...Array(6)].map((_, index) => (
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
          
          <TouchableOpacity style={styles.button} onPress={handlerEmailVerification}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0356A2',
    padding: 20,
  },
  mainContainer: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: -50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    color: '#0356A2',
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
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
