// Hooks de React
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
// Utilidades de React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importaciones de pantallas
import LoginScreen from './src/screens/LoginScreen';
import BottomTab from './src/navegation/BottonTab';
import VerifyEmailScreen from './src/screens/VerifyEmailScreen';
import VerifyCodeScreen from './src/screens/VerifyCodeScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import ChatScreen from './src/screens/ChatScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import EditProfileScreen from './src/screens/EditPerfilScreen';
import P_OptionsScreen from './src/screens/P_OptionsScreen';
import ChangeLanguageScreen from './src/screens/ChangeLanguageScreen';
import CambioContra from './src/screens/CambioContra';
import CambioContra1 from './src/screens/CambioContra-1';
import CambioContra2 from './src/screens/CambioContra-2';
import CambioContra3 from './src/screens/CambioContra-3';
import fetchData from "./src/utils/fetchData";
// Librerías
import * as SplashScreen from 'expo-splash-screen';
import 'intl-pluralrules';

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [logueado, setLogueado] = useState(false);

  
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

  useEffect(() => {
    async function inicia() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        await verifyLogged();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    inicia();
  }, []);

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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!logueado ? (
          <>
            {/* Pantallas de autenticación */}
            <Stack.Screen name="Login">
              {props => (
                <LoginScreen {...props} logueado={logueado} setLogueado={setLogueado} />
              )}
            </Stack.Screen>
            <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
            <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          </>
        ) : (
          <>
            {/* Pantallas principales con BottomTab */}
            <Stack.Screen name="BottomTabs">
              {props => (
                <BottomTab {...props} logueado={logueado} setLogueado={setLogueado} />
              )}
            </Stack.Screen>

            {/* Pantallas adicionales sin BottomTab */}
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="POptions">
              {props => (
                <P_OptionsScreen {...props} logueado={logueado} setLogueado={setLogueado} />
              )}
            </Stack.Screen>
            <Stack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} />
            <Stack.Screen name="CambioContra" component={CambioContra} />
            <Stack.Screen name="CambioContra1" component={CambioContra1} />
            <Stack.Screen name="CambioContra2" component={CambioContra2} />
            <Stack.Screen name="CambioContra3" component={CambioContra3} />
          </>
        )}
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
