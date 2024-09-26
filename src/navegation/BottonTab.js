import React, { useEffect, useState } from "react";
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
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#004E92",
          tabBarActiveBackgroundColor: "#44FFFD",
          tabBarInactiveBackgroundColor: "#2196F3",
          tabBarIcon: ({ color }) => <Entypo name="home" size={34} color={color} />,
        }}
      >
        {props => <HomeScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Tab.Screen>
      <Tab.Screen
        name="MessagesScreen"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#004E92",
          tabBarActiveBackgroundColor: "#44FFFD",
          tabBarInactiveBackgroundColor: "#2196F3",
          tabBarIcon: ({ color }) => <Entypo name="chat" size={34} color={color} />,
        }}
      >
        {props => <MessagesScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Tab.Screen>
      <Tab.Screen
        name="PerfilScreen"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#004E92",
          tabBarActiveBackgroundColor: "#44FFFD",
          tabBarInactiveBackgroundColor: "#2196F3",
          tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={34} color={color} />,
        }}
      >
        {props => <PerfilScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Tab.Screen>
      <Tab.Screen
        name="NotifiScreen"
        options={{
          title: "Notificaciones",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#004E92",
          tabBarActiveBackgroundColor: "#44FFFD",
          tabBarInactiveBackgroundColor: "#2196F3",
          tabBarIcon: ({ color }) => <Fontisto name="bell-alt" size={34} color={color} />,
        }}
      >
        {props => <NotifiScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Tab.Screen>

      <Tab.Screen
        name="LoginNav"
        component={LoginNav}
        //Escondemos la opcion para que no aparezca en el BottomTab
        options={({ route }) => ({
          tabBarButton: () => null,
          headerShown: false
        })}
      />
    </Tab.Navigator >
  );
}