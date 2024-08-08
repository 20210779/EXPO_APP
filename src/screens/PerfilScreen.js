import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import { Card, Button } from "react-native-paper";
import fetchData from "../utils/fetchData";
import imageData from "../utils/imageData";
import * as ImagePicker from "expo-image-picker";
import foto from "../../assets/miperfil.png";
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import * as RNRestart from 'react-native-restart';
import 'intl-pluralrules';

export default function PerfilScreen({ navigation }) {
  const { t } = useTranslation();
  //Arreglo para el perfil
  const [profile, setProfile] = useState({
    name: " ",
    fullname: " ",
    email: " ",
    phone: " ",
    image: Image.resolveAssetSource(foto).uri,
  });
  // URL de la API para el usuario
  const USER_API = "services/admin/usuario.php";

  // Función para manejar la carga del perfil
  const readProfile = async () => {
    try {
      const data = await fetchData(USER_API, "readProfile");
      const profileData = data.dataset;
      const imageUrl = profileData.imagen_usuario
        ? await imageData("usuarios", profileData.imagen_usuario)
        : Image.resolveAssetSource(foto).uri;

      setProfile({
        name: profileData.nombre,
        fullname: profileData.apellido,
        email: profileData.correo_electronico,
        phone: profileData.numero_telefono,
        image: imageUrl,
      });

      console.log(data.dataset);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Petición hecha");
    }
  };

  useEffect(() => {
    readProfile();
  }, []);

  const GoPerfil = () => {
    navigation.navigate("POptions");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo_carga.png")} // Reemplaza con la ruta de tu logo
          style={styles.logo}
        />
        <Text style={styles.title}>Pemi-parts</Text>
      </View>
      <Image source={{ uri: profile.image }} style={styles.profileImage} />
      <View style={styles.infoH}>
        <Text style={styles.name}>
          {profile.name} {profile.fullname}
        </Text>
      </View>
      <Card style={styles.card}>
        <Text style={styles.info}>Correo: {profile.email}</Text>
        <Text style={styles.info}>Teléfono: {profile.phone}</Text>
        <Button mode="contained" style={styles.button} onPress={GoPerfil}>
          Opciones
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00A2FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1976D2",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
  },
  infoH: {
    width: "100%",
    padding: 9,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004E92",
  },
  card: {
    width: "100%",
    padding: 90,
    alignItems: "center",
    backgroundColor: "#1984E2",
  },
  profileImage: {
    width: "100%",
    height: 230,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 0,
    backgroundColor: "#67B4F9",
  },
});
