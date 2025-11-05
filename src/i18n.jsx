
    import i18n from 'i18next';
    import { initReactI18next } from 'react-i18next';
    import LanguageDetector from 'i18next-browser-languagedetector';
    import Backend from 'i18next-http-backend'; 

    import translationEN from './locales/en/translation.json';
    import translationFR from './locales/fr/translation.json';

    i18n
    .use(Backend) // Si vous voulez charger via HTTP ; sinon, supprimez cette ligne et utilisez les imports ci-dessus
    .use(LanguageDetector) // Détecte la langue (localStorage prioritaire, puis navigateur)
    .use(initReactI18next)
    .init({
        resources: {
        en: {
            translation: translationEN,
        },
        fr: {
            translation: translationFR,
        },
        },
        lng: 'fr', // Langue par défaut : français
        fallbackLng: 'fr', // Fallback si traduction manquante
        detection: {
        order: ['localStorage', 'navigator'], // Priorité : localStorage > navigateur
        caches: ['localStorage'], // Persiste dans localStorage
        },
        interpolation: {
        escapeValue: false, // Pas d'échappement React (dangerousText déjà géré)
        },
        react: {
        useSuspense: false, // Évite les erreurs de suspense
        },
    });

    export default i18n;