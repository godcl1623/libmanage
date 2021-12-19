const CryptoJS = require('crypto-js');

// export const encryptor = (string, key) => CryptoJS.AES.encrypt(string, key).toString();

// export const decryptor = (ciphered, key) => {
//   const decrypted = CryptoJS.AES.decrypt(ciphered, key);

//   return decrypted.toString(CryptoJS.enc.Utf8);
// };

export const encryptor = (object, key) => CryptoJS.AES.encrypt(JSON.stringify(object), key).toString();

export const decryptor = (ciphered, key) => {
  const decrypted = CryptoJS.AES.decrypt(ciphered, key);

  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}