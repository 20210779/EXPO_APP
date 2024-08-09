// Importamos los componentes necesarios de React y React Native, así como algunos componentes personalizados y funciones utilitarias.
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from '../components/input/input';
//import Buttons from "../components/Buttons/Button";
import fetchData from "../utils/fetchData";

// Definimos el componente funcional Sesion que recibe la ruta (route) como prop.
export default function Sesion({ route }) {
  // Extraemos el tokenV de la ruta recibida como parámetro.
  const { tokenV } = route.params;
  // Definimos estados locales para manejar las contraseñas nuevas y la visibilidad del teclado.
  const [npassword, setNpassword] = useState("");
  const [cnpassword, setCNpassword] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  
  const USER_API = "services/admin/usuario.php";
  // Obtenemos el objeto de navegación usando useNavigation.
  const navigation = useNavigation();

  // Función asincrónica para manejar el cambio de contraseña.
  const handlerChangePassword = async () => {
    try {
      // Creamos un FormData con el tokenV, nueva contraseña y confirmación de nueva contraseña.
      const form = new FormData();
      form.append("token", tokenV);
      form.append("usuario_nueva_contraseña", npassword);
      form.append("usuario_confirmar_nueva_contraseña", cnpassword);
      
      // Hacemos una solicitud usando fetchData para cambiar la contraseña y recibir una respuesta.
      const DATA = await fetchData(USER_API, "changePasswordByEmail", form);
      // Si la solicitud es exitosa (DATA.status es verdadero), limpiamos las contraseñas, mostramos una alerta y navegamos a la pantalla de inicio de sesión.
      if (DATA.status) {
        setNpassword("");
        setCNpassword("");
        Alert.alert("Éxito", "La contraseña se ha cambiado correctamente");
        navigation.reset({
            index: 0,
            routes: [{ name: 'Sesion' }],
          });
      } else {
        // En caso de error, mostramos un mensaje de error en una alerta.
        console.log(DATA);
        Alert.alert("Error sesión", DATA.error);

        // Si el error es debido a que el tiempo para cambiar la contraseña ha expirado, navegamos de vuelta a la pantalla de inicio de sesión.
        if(DATA.error == "El tiempo para cambiar su contraseña ha expirado"){
            navigation.reset({
                index: 0,
                routes: [{ name: 'Sesion' }],
              });
        }
      }
    } catch (error) {
      // Capturamos y manejamos errores que puedan ocurrir durante la solicitud.
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al iniciar sesión");
    }
  };

  // Efecto de useEffect para manejar la visibilidad del teclado.
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // Actualizamos el estado cuando el teclado se muestra.
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // Actualizamos el estado cuando el teclado se oculta.
      }
    );

    // Removemos los listeners al desmontar el componente para evitar memory leaks.
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Renderizamos el componente con KeyboardAvoidingView para manejar el comportamiento del teclado según la plataforma.
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.mainContainer, keyboardVisible && { marginTop: -30 }]}>
          <Text style={styles.LargeText}>Verificación</Text>
          <Input
            placeHolder="Nueva Contraseña"
            setValor={npassword}
            setTextChange={setNpassword}
            contra={true}
          />
          <Input
            placeHolder="Confirmar Nueva Contraseña"
            setValor={cnpassword}
            setTextChange={setCNpassword}
            contra={true}
          />
          <Buttons textoBoton="Siguiente >" accionBoton={handlerChangePassword} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
  
  // Estilos del componente.
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      justifyContent: 'center',
    },
    decorator: {
      height: 300,
      width: "100%",
      position: "relative",
    },
    LargeText: {
      fontSize: 30,
      fontFamily: "FuturaMedium",
      marginTop: 20,
      marginBottom: 30,
      color: "#333333",
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
    textPositioner: {
      marginTop: 25,
    },
    buttonText: {
      fontFamily: "FuturaMedium",
      marginBottom: 20,
      fontSize: 18,
      color: "#333333",
    },
    texto: {
      color: "#322C2B",
      fontWeight: "900",
      fontSize: 20,
    },
    textRegistrar: {
      color: "#322C2B",
      fontWeight: "700",
      fontSize: 18,
      marginTop: 10,
    },
    devider: {
      marginTop: 10,
    },
  });
}  