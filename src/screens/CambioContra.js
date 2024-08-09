// Importamos los componentes necesarios de React y React Native, así como algunos componentes personalizados y funciones utilitarias.
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import fetchData from "../utils/fetchData";
//import Buttons from '../components/Buttons/Button';
import Input from '../components/input/input';

// Definimos el componente funcional Home que recibe la navegación como prop.
export default function Home({ navigation }) {
  // Definimos estados locales para manejar las contraseñas actual, nueva y confirmación de nueva.
  const [actual, setActual] = useState("");
  const [newPass, setNewPass] = useState("");
  const [cnewPass, setCNewPass] = useState("");
  // URL de la API para el usuario
  const USER_API = "services/admin/usuario.php";
  // Función asincrónica para manejar el cambio de contraseña.
  const handleChangePassword = async () => {
    try {
      // Creamos un FormData con la contraseña actual, nueva y confirmación de nueva.
      const form = new FormData();
      form.append("contraseña", actual);
      form.append("usuario_nueva_contraseña", newPass);
      form.append("usuario_confirmar_nueva_contraseña", cnewPass);

      // Hacemos una solicitud usando fetchData para cambiar la contraseña y recibimos una respuesta.
      const DATA = await fetchData(USER_API, "changePassword", form);
      // Si la solicitud es exitosa (DATA.status es verdadero), mostramos una alerta con el mensaje recibido y cerramos sesión.
      if (DATA.status) {
        Alert.alert("Hecho!", DATA.message);
        handleLogout();
      } else {
        // En caso de error, mostramos un mensaje de error en una alerta y retornamos para evitar más ejecución.
        console.log(DATA.error);
        Alert.alert("Error", DATA.error);
        return;
      }
    } catch (error) {
      // Capturamos y manejamos errores que puedan ocurrir durante la solicitud.
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al registrar la cuenta");
    }
  };

  // Función asincrónica para manejar el cierre de sesión.
  const handleLogout = async () => {
    try {
      // Hacemos una solicitud usando fetchData para cerrar la sesión y recibimos una respuesta.
      const DATA = await fetchData(USER_API, "logOut");
      // Si la solicitud es exitosa (DATA.status es verdadero), navegamos de regreso a la pantalla de inicio de sesión.
      if (DATA.status) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Sesion' }],
        });
      } else {
        // En caso de error, mostramos un mensaje de error en una alerta.
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      // Capturamos y manejamos errores que puedan ocurrir durante la solicitud.
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  // Renderizamos el componente.
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Input
          placeHolder="Contraseña Actual"
          setValor={actual}
          setTextChange={setActual}
          contra={true}
        />
        <Input
          placeHolder="Contraseña Nueva"
          setValor={newPass}
          setTextChange={setNewPass}
          contra={true}
        />
        <Input
          placeHolder="Confirmar Nueva Contraseña"
          setValor={cnewPass}
          setTextChange={setCNewPass}
          contra={true}
        />
        <Buttons textoBoton='Cambiar Contraseña' accionBoton={handleChangePassword} />
      </View>
    </View>
  );
  
  // Estilos del componente.
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    mainContainer: {
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 30,
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      alignItems: 'center',
    }
  }
);
}