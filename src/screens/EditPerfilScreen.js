import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  
  const [name, setName] = useState('Juancho Perez');
  const [email, setEmail] = useState('JuanP@gmail.com');
  const [phone, setPhone] = useState('12345678');
  const [dui, setDui] = useState('12345678-9');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Editar perfil de usuario</Text>
      </View>
      <Image
        source={require('../../assets/miperfil.png')}  // Reemplaza con la ruta de tu logo
        style={styles.profileImage}
      />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Correo:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Telefono:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.label}>Dui:</Text>
        <TextInput
          style={styles.input}
          value={dui}
          onChangeText={setDui}
        />
        <View style={styles.imageUploadContainer}>
          <Text style={styles.label}>Editar imagen:</Text>
          <TouchableOpacity style={styles.imageUploadButton}>
            <MaterialIcons name="add-photo-alternate" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
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
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileImage: {
    width: '100%',
    height: 230,
  },
  formContainer: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  imageUploadButton: {
    backgroundColor: '#0096FF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default EditProfileScreen;