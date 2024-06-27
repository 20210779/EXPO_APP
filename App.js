// Hooks de React
import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
// Utilidades de React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import NavStack from './src/navegation/NavStack';
import VerifyEmailScreen from './src/screens/VerifyEmailScreen'
import BottomTab from './src/navegation/BottonTab';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import VerifyCodeScreen from './src/screens/VerifyCodeScreen';
import ChatScreen from './src/screens/ChatScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import EditProfileScreen from './src/screens/EditPerfilScreen';
import P_OptionsScreen from './src/screens/P_OptionsScreen';
//Librerias
import * as SplashScreen from 'expo-splash-screen';



const Stack = createNativeStackNavigator();

//Componente principal
export default function App() {

  // appIsReady: Variable para indicar si la aplicación ya está lista
  // setAppIsReady: Función para actualizar la variable appIsReady
  const [appIsReady, setAppIsReady] = useState(false);

  // useEffect: Hook que, de forma predeterminada, se ejecuta después del primer renderizado 
  // y después de cada actualización
  useEffect(() => {
    // Función asíncrona que simula la inicialización de la aplicación
    async function inicia() {
      try {
        // Retrasar el lanzamiento de la aplicación por 4 segundos
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (e) {
        // Mostrar error en caso de existir
        console.warn(e);
      } finally {
        // Cambiar valor de la variable para indicar que la aplicación está lista
        setAppIsReady(true); 
      }
    }

    // Llamar a la función inicia
    inicia();
  }, []); // El segundo argumento vacío [] asegura que el efecto se ejecute solo una vez después del primer renderizado

  
  if (!appIsReady) {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/pemi_parts_logo.gif')}
          onLoadEnd={async () => {
            await SplashScreen.hideAsync();
          }}
          style={styles.gif}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={BottomTab} options={{headerShown:false}}/>
        <Stack.Screen name="Perfil" component={BottomTab} options={{headerShown:false}}/>
        <Stack.Screen name="Pass" component={VerifyEmailScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown:false}}/>
        <Stack.Screen name="VerifyCodeScreen" component={VerifyCodeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{headerShown:false}}/>
        <Stack.Screen name="POptions" component={P_OptionsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  gif: {
    width: 200,
    height: 200,
  },
});