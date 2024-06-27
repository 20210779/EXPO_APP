import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const EditProfileScreen = () => {
  const [name, setName] = useState('Juancho Perez');
  const [email, setEmail] = useState('JuanP@gmail.com');
  const [phone, setPhone] = useState('12345678');
  const [dui, setDui] = useState('12345678-9');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
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
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#0096FF',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -30,
  },
  formContainer: {
    width: '90%',
    marginTop: 20,
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
