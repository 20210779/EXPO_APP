// Utilidades de React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


// Pantallas de navegación
import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ChatScreen from '../screens/ChatScreen';
import MessagesScreen from '../screens/MessagesScreen';
import NotifiScreen from "../screens/NotifiScreen";
import LoginNav from "../navegation/LoginNav.js";

// Botones de navegacion 
const Tab = createBottomTabNavigator();

export default function BottomTab({logueado, setLogueado}) {
  return (
    <Tab.Navigator>
    <Tab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        title: 'Inicio',
        headerShown:false,
        tabBarShowLabel: false, 
        tabBarActiveTintColor: '#FFC300', // Color activo de la pestaña.
        headerStyle: {
          backgroundColor: '#FFC300', // Color del header
        },
        tabBarActiveBackgroundColor: "#44FFFD",
        tabBarInactiveBackgroundColor: "#1BC8FF",
        headerTintColor: '#fff',
        tabBarIcon: ({ color }) => (
          <Entypo name="home" size={34} />
        ),
      }}  
    />
     <Tab.Screen
      name="MessagesScreen"
      component={MessagesScreen}
      options={{    
        headerShown:false,
        tabBarShowLabel: false, 
        tabBarActiveTintColor: '#004E92', // Color activo de la pestaña
        headerStyle: {
          backgroundColor: '#000000', // Color del header
        },
        tabBarActiveBackgroundColor: "#44FFFD",
        tabBarInactiveBackgroundColor: "#1BC8FF",
        headerTintColor: '#000000', // Color del texto en el header
        tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
          <Entypo name="chat" color={color} size={34} /> // `color` proviene de React Navigation
        ),
      }}
    />
    <Tab.Screen
      name="PerfilScreen"
      component={PerfilScreen}
      options={{
        title: 'PerfilScreen',
        headerShown:false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000000', // Color activo de la pestaña
        headerStyle: {
          backgroundColor: '#000000',
        },
        tabBarActiveBackgroundColor: "#44FFFD",
        tabBarInactiveBackgroundColor: "#1BC8FF",
        headerTintColor: '#000000',
        tabBarIcon: ({ color }) => (
          <FontAwesome name="user-circle-o" size={34}/>
        ),
      }}
    />
    <Tab.Screen
      name="NotifiScreen"
      component={NotifiScreen}
      options={{
        title: 'Lista Pokemon Fetch',
        headerShown:false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000000', // Color activo de la pestaña
        headerStyle: {
          backgroundColor: '#3b4cca',
        },
        headerTintColor: '#fff',
        tabBarActiveBackgroundColor: "#44FFFD",
        tabBarInactiveBackgroundColor: "#1BC8FF",
        tabBarIcon: ({ color }) => (
          <Fontisto name="bell-alt" size={34}/>
        ),
      }}
    />
    <Tab.Screen
      name="LoginNav"
      component={LoginNav}
      //Escondemos la opcion para que no aparezca en el BottomTab
      options={({ route }) => ({
        tabBarButton: () => null,
        headerShown: false
      })}
    />
  </Tab.Navigator>
  
  );
}
