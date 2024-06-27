import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const ChangeLanguageScreen = () => {
  const navigation = useNavigation();

  const handleLanguageChange = (language) => {
    // Aquí puedes agregar la lógica para cambiar el idioma
    console.log('Idioma seleccionado: ' + language);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cambiar idioma</Text>
      </View>
      <Image
        source={require('../../assets/miperfil.png')}  
        style={styles.profileImage}
      />
      <View style={styles.languageContainer}>
        <MaterialIcons name="language" size={50} color="white" />
        <View style={styles.languages}>
          <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageChange('es')}>
            <Text style={styles.languageText}>Español</Text>
            <Image
              source={require('../../assets/espana.png')}  
              style={styles.flag}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageChange('en')}>
            <Text style={styles.languageText}>Ingles</Text>
            <Image
              source={require('../../assets/usa.png')} 
              style={styles.flag}
            />
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
  languageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  languageButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  languageText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  flag: {
    width: 100,
    height: 100,
  },
});

export default ChangeLanguageScreen;