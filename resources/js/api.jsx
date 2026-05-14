export const constTrans = (transArray, key, locale = "el") => {
    return transArray[locale]?.[key];
};