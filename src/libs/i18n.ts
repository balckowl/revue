import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: "ja",
    // debug: true,
    ns: ["main", "validation"],
    fallbackNS: "main",
    detection: {
      order: ["localStorage", "navigator"],
    },
    backend: {
      loadPath: "/languages/{{lng}}/{{ns}}.json",
    }
  });