import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from '../config/locales/en.json';
import es from '../config/locales/es.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale.split('-')[0], // Detecta el idioma del dispositivo
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;