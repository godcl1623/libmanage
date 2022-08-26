const CryptoJS = require('crypto-js');

export const encryptor = (target: any, key: string) => CryptoJS.AES.encrypt(JSON.stringify(target), key).toString();

export const decryptor = (ciphered: any, key: string) => {
  const decrypted = CryptoJS.AES.decrypt(ciphered, key);

  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}