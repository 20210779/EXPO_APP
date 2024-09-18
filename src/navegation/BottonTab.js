import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo, FontAwesome, Fontisto } from "@expo/vector-icons";

// Pantallas de navegación
import HomeScreen from "../screens/HomeScreen";
import PerfilScreen from "../screens/PerfilScreen";
import MessagesScreen from "../screens/MessagesScreen";
import NotifiScreen from "../screens/NotifiScreen";
import LoginNav from "../navegation/LoginNav";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// BottomTab Navigator
export default function BottomTabNavigator({ logueado, setLogueado }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={(props) => (
          <HomeScreen {...props} setLogueado={setLogueado} logueado={logueado} />
        )}
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFC300",
          tabBarActiveBackgroundColor: "#44FFFD",
          tabBarInactiveBackgroundColor: "#1BC8FF",
          tabBarIcon: ({ color }) => <Entypo name="home" size={34} color={color} />,
        }}
      />
      <Tab.Screen
        name="MessagesScreen"
        component={(props) => (
          <MessagesScreen {...props} setLogueado={setLogueado} logueado={logueado} />
        )}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#004E92",
          tabBarActiveBackgroundColor: "#44FFFD",
          tabBarInactiveBackgroundColor: "#1BC8FF",
          tabBarIcon: ({ color }) => <Entypo name="chat" size={34} color={color} />,
        }}
      />
      <Tab.Screen
        name="PerfilScreen"
        component={(props) => (
          <PerfilScreen {...props} setLogueado={setLogueado} logueado={logueado} />
        )}
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#000000",
          tabBarActiveBackgroundColor: "#44FFFD",
          tabBarInactiveBackgroundColor: "#1BC8FF",
          tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={34} color={color} />,
        }}
      />
      <Tab.Screen
        name="NotifiScreen"
        component={(props) => (
          <NotifiScreen {...props} setLogueado={setLogueado} logueado={logueado} />
        )}
        options={{
          title: "Notificaciones",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#000000",
          tabBarActiveBackgroundColor: "#44FFFD",
          tabBarInactiveBackgroundColor: "#1BC8FF",
          tabBarIcon: ({ color }) => <Fontisto name="bell-alt" size={34} color={color} />,
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