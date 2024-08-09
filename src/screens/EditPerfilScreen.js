import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import fetchData from "../utils/fetchData";
import imageData from "../utils/imageData";
import * as ImagePicker from "expo-image-picker";
import i18n from './i18n';
import * as RNRestart from 'react-native-restart';
import 'intl-pluralrules';

const EditProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const USER_API = "services/admin/usuario.php";
  const [profile, setProfile] = useState({
    name: "",
    fullname: "",
    email: "",
    phone: "",
    image: null,
  });

  const [name, setName] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);

  const readProfile = async () => {
    try {
      const data = await fetchData(USER_API, "readProfile");
      const profileData = data.dataset;
      const imageUrl = profileData.imagen_usuario
        ? await imageData("usuarios", profileData.imagen_usuario)
        : Image.resolveAssetSource(require('../../assets/miperfil.png')).uri;

      setProfile({
        name: profileData.nombre,
        fullname: profileData.apellido,
        email: profileData.correo,
        phone: profileData.numero_telefono,
        image: imageUrl,
      });

      setName(profileData.nombre);
      setFullname(profileData.apellido);
      setEmail(profileData.correo);
      setPhone(profileData.numero_telefono);
      setImage(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const editProfile = async () => {
    try {
      const form = new FormData();
      form.append('nombreUsuario', name);
      form.append('apellidoUsuario', fullname);
      form.append('correoUsuario', email);
      form.append('telefonoUsuario', phone);

      if (image) {
        const uriParts = image.split(".");
        const fileType = uriParts[uriParts.length - 1];
        form.append("imagenUsuario", {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }
      const data = await fetchData(USER_API, 'editProfile', form);
      if (data.status) {
        Alert.alert(data.message);
        readProfile();
      } else {
        Alert.alert('Error: ' + data.error);
      }
    } catch (error) {
      Alert.alert('No se pudo acceder a la API: ' + error.message);
    }
  };

  useEffect(() => {
    readProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Editar perfil de usuario</Text>
      </View>
      <Image
        source={{ uri: image || profile.image }}
        style={styles.profileImage}
      />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Apellido:</Text>
        <TextInput
          style={styles.input}
          value={fullname}
          onChangeText={setFullname}
        />
        <Text style={styles.label}>Correo:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
        <View style={styles.imageUploadContainer}>
          <Text style={styles.label}>Editar imagen:</Text>
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={pickImage}
          >
            <MaterialIcons name="add-photo-alternate" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={editProfile}
          style={styles.saveButton}>
          <Text style={styles.label}>Guardar</Text>
        </TouchableOpacity>
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
  saveButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#334195",
    maxWidth: '100%',
    textAlign: 'center'
  },
});

export default EditProfileScreen;
