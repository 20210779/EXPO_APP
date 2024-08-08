import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import * as RNRestart from 'react-native-restart';
import 'intl-pluralrules';
const ChangeLanguageScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language).then(() => {
      RNRestart.Restart();
    });
  };
  //aqui estan los botones para el cambio de idioma 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t('change_language')}</Text>
      </View>
      <Image
        source={require('../../assets/miperfil.png')}  // imagen de fondo del usuario
        style={styles.profileImage}
      />
      <View style={styles.languageContainer}>
        <MaterialIcons name="language" size={50} color="white" />
        <View style={styles.languages}>
          <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageChange('es')}>
            <Text style={styles.languageText}>{t('spanish')}</Text>
            <Image
              source={require('../../assets/espana.png')}  // bandera de españa para el español
              style={styles.flag}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageChange('en')}>
            <Text style={styles.languageText}>{t('english')}</Text>
            <Image
              source={require('../../assets/usa.png')}  // bandera de estados unidos para el ingles
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