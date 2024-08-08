import React from 'react'; // Importa React para construir componentes.
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'; // Importa componentes básicos de React Native.
import { useNavigation } from '@react-navigation/native'; // Importa el hook de navegación de React Navigation.
import { MaterialIcons } from '@expo/vector-icons'; // Importa íconos de Material Design de Expo.
import { useTranslation } from 'react-i18next'; // Importa el hook de traducción de i18next.
import i18n from './i18n'; // Importa la configuración de i18n previamente definida.
import * as RNRestart from 'react-native-restart'; // Importa el módulo para reiniciar la app.
import 'intl-pluralrules'; // Importa soporte para reglas de pluralización.

const ChangeLanguageScreen = () => { // Define un componente de pantalla para cambiar el idioma.
  const navigation = useNavigation(); // Usa el hook de navegación para permitir regresar a la pantalla anterior.
  const { t } = useTranslation(); // Usa el hook de traducción para acceder a las funciones de traducción.

  const handleLanguageChange = (language) => { // Define una función para manejar el cambio de idioma.
    i18n.changeLanguage(language).then(() => { // Cambia el idioma utilizando i18n.
      RNRestart.Restart(); // Reinicia la aplicación para aplicar el cambio de idioma.
    });
  };

  // Aquí están los botones para el cambio de idioma.
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}> {/* Botón para regresar a la pantalla anterior */}
          <MaterialIcons name="arrow-back" size={24} color="white" /> {/* Icono de flecha hacia atrás */}
        </TouchableOpacity>
        <Text style={styles.headerText}>{t('change_language')}</Text> {/* Texto del encabezado traducido */}
      </View>
      <Image
        source={require('../../assets/miperfil.png')} // Imagen de perfil del usuario
        style={styles.profileImage}
      />
      <View style={styles.languageContainer}>
        <MaterialIcons name="language" size={50} color="white" /> {/* Icono de lenguaje */}
        <View style={styles.languages}>
          <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageChange('es')}>
            <Text style={styles.languageText}>{t('spanish')}</Text> {/* Texto para español */}
            <Image
              source={require('../../assets/espana.png')} // Bandera de España para el idioma español
              style={styles.flag}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageChange('en')}>
            <Text style={styles.languageText}>{t('english')}</Text> {/* Texto para inglés */}
            <Image
              source={require('../../assets/usa.png')} // Bandera de Estados Unidos para el idioma inglés
              style={styles.flag}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ // Define los estilos para los componentes
  container: {
    flex: 1, // Ocupa todo el espacio disponible.
    backgroundColor: '#00A2FF', // Color de fondo azul.
  },
  header: {
    flexDirection: 'row', // Los elementos dentro del header estarán en fila.
    alignItems: 'center', // Alinea los elementos del header al centro verticalmente.
    padding: 16, // Espaciado interno de 16 píxeles.
    backgroundColor: '#1976D2', // Color de fondo azul oscuro para el header.
  },
  headerText: {
    color: 'white', // Color de texto blanco.
    fontSize: 20, // Tamaño de fuente grande.
    fontWeight: 'bold', // Texto en negrita.
    marginLeft: 10, // Espaciado a la izquierda de 10 píxeles.
  },
  profileImage: {
    width: '100%', // Ancho completo de la pantalla.
    height: 230, // Altura fija de 230 píxeles.
  },
  languageContainer: {
    alignItems: 'center', // Centra los elementos horizontalmente.
    marginTop: 20, // Espaciado superior de 20 píxeles.
  },
  languages: {
    flexDirection: 'row', // Los botones de idiomas estarán en fila.
    justifyContent: 'space-around', // Espacia los botones equitativamente.
    marginTop: 20, // Espaciado superior de 20 píxeles.
  },
  languageButton: {
    alignItems: 'center', // Centra los elementos del botón.
    marginHorizontal: 20, // Espaciado horizontal de 20 píxeles entre botones.
  },
  languageText: {
    fontSize: 20, // Tamaño de fuente grande para el texto del idioma.
    color: 'white', // Color de texto blanco.
    marginBottom: 10, // Espaciado inferior de 10 píxeles.
  },
  flag: {
    width: 100, // Ancho de la imagen de la bandera de 100 píxeles.
    height: 100, // Altura de la imagen de la bandera de 100 píxeles.
  },
});

export default ChangeLanguageScreen; // Exporta el componente para ser utilizado en otras partes de la aplicación.
