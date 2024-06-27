import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import { Card, Button } from 'react-native-paper';

export default function PerfilScreen({ navigation }) {

  const GoPerfil = () =>{
    navigation.navigate("POptions");
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
      <Image
          source={require('../../assets/miperfil.png')}  // Reemplaza con la ruta de tu logo
          style={styles.profileImage}
        />
        <Text style={styles.name}>Juancho Perez</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#0096FF',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
});


