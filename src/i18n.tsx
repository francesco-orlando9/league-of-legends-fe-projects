import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationIT from "./assets/i18n/it.json";
import translationEN from "./assets/i18n/en.json";

const resources = {
  it: {
    translation: translationIT,
  },
  en: {
    translation: translationEN,
  },
};
const lng = navigator.language || "en";

i18n.use(initReactI18next).init({
  resources,
  lng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
