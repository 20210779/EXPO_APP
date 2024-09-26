import React from 'react';
import { View, StyleSheet, Image, Alert, Text, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import RNRestart from 'react-native-restart';
import { useTranslation } from 'react-i18next';

import fetchData from "../utils/fetchData";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const USER_API = "services/admin/usuario.php";
export default function P_OptionsScreen({ navigation, logueado, setLogueado }) {
  const { t } = useTranslation(); // Accede a las traducciones

  const GoPerfil = () => {
    navigation.navigate("EditProfile");
  }
  const BackPerfil = () => {
    // Navega a la pantalla de perfil dentro del BottomTab
    navigation.navigate("BottomTabs", {
      screen: "Perfil", // Nombre de la pantalla de perfil en el BottomTab
    });
  };
  const GoLanguage = () => {
    navigation.navigate("ChangeLanguage");
  }


  const handleLogout = async () => {
    try {
      const DATA = await fetchData(USER_API, 'logOut');
      if (DATA.status) {
        //navigation.navigate("LoginNav");
        setLogueado(false);
      };
      const data = await response.json();
      if (data.status) {
        navigation.navigate('LoginNav');
      } else {
        console.log('Error', data.error);
      }
    } catch (error) {
      console.log('Error', 'Ocurrió un error al cerrar la sesión: ' + error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo_carga.png')} // Reemplaza con la ruta de tu logo
          style={styles.logo}
        />
        <Text style={styles.title}>Pemi-parts</Text>
      </View>
      <Image
        source={require('../../assets/miperfil.png')}  // Reemplaza con la ruta de tu logo
        style={styles.profileImage}
      />
      <View style={styles.infoH}>
        <Text style={styles.name}>Opciones</Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.optionsContainer}>

          <View style={styles.option}>
            <MaterialIcons name="edit" size={24} color="white" />
            <Button mode="contained" style={styles.button} onPress={GoPerfil}>
              Editar
            </Button>
          </View>
         {/*  <View style={styles.option}>
            <MaterialIcons name="language" size={24} color="white" />
            <Button mode="contained" style={styles.button} onPress={GoLanguage}>
              Idioma
            </Button>
          </View> */}
          <View style={styles.option}>
            <Button mode="contained" style={styles.button} onPress={handleLogout}>
              cerrar sesion
            </Button>
          </View>
          <Button mode="contained" style={styles.backButton} onPress={BackPerfil}>
            Regresar
          </Button>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003D74',
    paddingVertical: windowHeight * 0.05,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  infoH: {
    width: '100%',
    padding: 9,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004E92',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0D47A1',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    padding: 90,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#0D47A1',
  },
  profileImage: {
    width: '100%',
    height: 230,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '80%',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#1976D2',
    flex: 1,
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: '#42A5F5',
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});


