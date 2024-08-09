import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import ChatScreen from '../screens/ChatScreen';
import PerfilScreen from '../screens/PerfilScreen';
import EditProfileScreen from '../screens/EditPerfilScreen';
import P_OptionsScreen from '../screens/P_OptionsScreen';
import ChangeLanguageScreen from '../screens/ChangeLanguageScreen';
import CambioContra from '../screens/CambioContra';
import CambioContra1 from '../screens/CambioContra-1';
import CambioContra2 from '../screens/CambioContra-2';
import CambioContra3 from '../screens/CambioContra-3';

const Stack = createNativeStackNavigator();

export default function LoginNav({ logueado, setLogueado }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="POptions" component={P_OptionsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CambioContra" component={CambioContra} options={{ headerShown: false }} />
      <Stack.Screen name="CambioContra1" component={CambioContra1} options={{ headerShown: false }} />
      <Stack.Screen name="CambioContra2" component={CambioContra2} options={{ headerShown: false }} />
      <Stack.Screen name="CambioContra3" component={CambioContra3} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
