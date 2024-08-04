import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import { Card, Button } from 'react-native-paper';

export default function PerfilScreen({ navigation }) {

  const GoPerfil = () =>{
    navigation.navigate("POptions");
  }

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
        <Text style={styles.name}>Juancho Perez</Text>
        </View>
      <Card style={styles.card}>
        
        <Text style={styles.info}>Correo: JuanP@gmail.com</Text>
        <Text style={styles.info}>Teléfono: 12345678</Text>
        <Text style={styles.info}>DUI: 12345678-9</Text>
        <Button mode="contained" style={styles.button} onPress={GoPerfil}>
          Opciones
        </Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A2FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1976D2',
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
  infoH:{
    width: '100%',
    padding: 9,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004E92',
  },
  card: {
    width: '100%',
    padding: 90,
    alignItems: 'center',
    backgroundColor: '#1984E2',
  },
  profileImage: {
    width: '100%',
    height: 230,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 0,
    backgroundColor: '#67B4F9',
  },
});


