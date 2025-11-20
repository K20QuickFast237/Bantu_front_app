/**
 * Encode une chaîne de caractères ou un nombre en Base64.
 * @param {string | number} data - La donnée à encoder.
 * @returns {string} La chaîne encodée en Base64.
 */
export const encodeId = (data) => btoa(String(data));

/**
 * Décode une chaîne de caractères depuis Base64.
 * @param {string} encodedData - La chaîne encodée.
 * @returns {string} La chaîne décodée.
 */
export const decodeId = (encodedData) => atob(encodedData);