// Utilidades de React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';

// Pantallas de navegación
import PokemonList from '../screens/PokemonList';
import HomeScreen from '../screens/HomeScreen';
import PokemonAxios from '../screens/PokemonAxios';

// Navegador Bottom Tabs Navigator
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
    <Tab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        title: 'Inicio',
        headerShown:false,
        tabBarActiveTintColor: '#FFC300', // Color activo de la pestaña
        headerStyle: {
          backgroundColor: '#FFC300', // Color del header
        },
        tabBarActiveBackgroundColor: "yellow",
        tabBarInactiveBackgroundColor: "red",
        headerTintColor: '#fff', // Color del texto en el header
        tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
          <Entypo name="chat" color={color} size={34} /> // `color` proviene de React Navigation
        ),
      }}
    />
    <Tab.Screen
      name="PokemonAxios"
      component={PokemonAxios}
      options={{
        title: 'Lista Pokemon con Axios',
        tabBarActiveTintColor: '#cc0000',
        headerStyle: {
          backgroundColor: '#cc0000',
          borderBottomRightRadius: 35,
          borderBottomLeftRadius: 35,
        },
        headerTintColor: '#fff',
        tabBarIcon: ({ color }) => (
          <Ionicons name="list" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="PokemonList"
      component={PokemonList}
      options={{
        title: 'Lista Pokemon Fetch',
        tabBarActiveTintColor: '#3b4cca',
        headerStyle: {
          backgroundColor: '#3b4cca',
        },
        headerTintColor: '#fff',
        tabBarIcon: ({ color }) => (
          <Ionicons name="list" color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
  
  );
}