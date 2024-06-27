import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export default function P_OptionsScreen({ navigation }) {

    const GoPerfil = () =>{
        navigation.navigate("EditProfile");
      }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pemi-parts</Text>
        <Text style={styles.headerText}>Perfil</Text>
      </View>
      <Card style={styles.card}>
      <Image
          source={require('../../assets/miperfil.png')}  // Reemplaza con la ruta de tu logo
          style={styles.profileImage}
        />
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Opciones</Text>
          <View style={styles.option}>
            <MaterialIcons name="edit" size={24} color="white" />
            <Button mode="contained" style={styles.button} onPress={GoPerfil}>
              Editar
            </Button>
          </View>
          <View style={styles.option}>
            <MaterialIcons name="language" size={24} color="white" />
            <Button mode="contained" style={styles.button}>
              Idioma
            </Button>
          </View>
          <View style={styles.option}>
            <Button mode="contained" style={styles.button}>
              cerrar sesion
            </Button>
          </View>
          <Button mode="contained" style={styles.backButton}>
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
    backgroundColor: '#00A2FF',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#0096FF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    width: '90%',
    marginTop: -50,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#0096FF',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
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
    backgroundColor: '#4CAF50',
    flex: 1,
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: '#00A2FF',
    marginTop: 20,
    width: '80%',
  },
});


