import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      instructions: {
        touchpad: "select a color and tap anywhere here"
      },
      colors: {
        white: "white", 
        pink: "pink",
        blue: "blue",
        orange:"orange"
      }
    },
  },
  de: {
    translation: {
      instructions: {
        touchpad: "Wähl eine Farbe aus und tippe irgendwo hierhin"
      },
      colors: {
        white: "weiß", 
        pink: "rosa",
        blue: "blau",
        orange:"orange"
      }
  },
}
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  });

export default i18n;
