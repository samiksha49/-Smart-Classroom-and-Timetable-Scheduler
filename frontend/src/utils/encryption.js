import CryptoJS from "crypto-js";

const SECRET_KEY =
    import.meta.env.VITE_AES_SECRET_KEY;

const key = CryptoJS.enc.Base64.parse(
    SECRET_KEY
);

export const encryptData = (plainText) => {
    const iv =
        CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(
        plainText,
        key,
        {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    const combined = iv.concat(
        encrypted.ciphertext
    );

    return CryptoJS.enc.Base64.stringify(
        combined
    );
};