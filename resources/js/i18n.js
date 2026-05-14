import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export default function initI18n(locale, translations) {
    if (!i18n.isInitialized) {
        i18n.use(initReactI18next).init({
            lng: locale,
            fallbackLng: 'en',

            resources: {
                [locale]: {
                    translation: translations,
                },
            },

            interpolation: {
                escapeValue: false,
            },
        });
    } else {
        i18n.changeLanguage(locale);

        i18n.addResourceBundle(locale, 'translation', translations, true, true);
    }

    window.ti8 = (key, options = {}) => i18n.t(key, options);

    window.ti8c = (key, options = {}) => {
        const text = i18n.t(key, options);

        if (!text) return text;

        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    window.ti8a = (arr) => {
        return arr.map((key, index) => (index === 0 ? window.ti8c(key) : window.ti8(key))).join(' ');
    };

    return i18n;
}
