import i18n from 'i18next'; // Importa la biblioteca i18next para la gestión de traducciones.
import { initReactI18next } from 'react-i18next'; // Importa el módulo que integra i18next con React.
import * as Localization from 'expo-localization'; // Importa la herramienta para obtener la configuración regional del dispositivo.
import en from '../config/locales/en.json'; // Importa las traducciones en inglés desde un archivo JSON.
import es from '../config/locales/es.json'; // Importa las traducciones en español desde un archivo JSON.

const resources = {
  en: { translation: en }, // Define las traducciones para el idioma inglés.
  es: { translation: es }, // Define las traducciones para el idioma español.
};

i18n
  .use(initReactI18next) // Utiliza el módulo para integrar i18next con React.
  .init({
    resources, // Carga las traducciones definidas en el objeto resources.
    lng: Localization.locale.split('-')[0], // Detecta el idioma del dispositivo y toma la parte del código de idioma.
    fallbackLng: 'en', // Si el idioma del dispositivo no está soportado, usa inglés como respaldo.
    interpolation: {
      escapeValue: false, // Desactiva el escape automático de valores interpolados, seguro en React.
    },
  });

export default i18n; // Exporta la configuración de i18n para su uso en toda la aplicación.
