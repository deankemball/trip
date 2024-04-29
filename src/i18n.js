import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      instructions: {
        touchpad: {
          first: "1. Enter your name",
          second: "2. Select a color",
          third: "3. Tap anywhere here",
        },
        input: {
          label: "name:",
          placeholder: "your name...",
          button: "send",
        },
      },
      colors: {
        white: "white",
        pink: "pink",
        blue: "blue",
        orange: "orange",
      },
    },
  },
  de: {
    translation: {
      instructions: {
        touchpad: {
          first: "1. Geben Sie Ihren Namen ein",
          second: "2. Wählen Sie eine Farbe aus",
          third: "3. Tippen Sie hier irgendwo",
        },
        input: {
          label: "Name:",
          placeholder: "deinen Namen...",
          button: "Schicken",
        },
      },
      colors: {
        white: "weiß",
        pink: "rosa",
        blue: "blau",
        orange: "orange",
      },
    },
  },
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
