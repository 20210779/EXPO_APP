import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
};
//nos va a servir para el traductor
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: RNLocalize.getLocales()[0].languageCode, // Detecta el idioma del dispositivo
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;