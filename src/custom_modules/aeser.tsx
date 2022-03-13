const CryptoJS = require('crypto-js');

// export const encryptor = (string, key) => CryptoJS.AES.encrypt(string, key).toString();

// export const decryptor = (ciphered, key) => {
//   const decrypted = CryptoJS.AES.decrypt(ciphered, key);

//   return decrypted.toString(CryptoJS.enc.Utf8);
// };

// target 타입 지정 필요
export const encryptor = (target: any, key: string) => CryptoJS.AES.encrypt(JSON.stringify(target), key).toString();

// target 타입 지정 필요
export const decryptor = (ciphered: any, key: string) => {
  const decrypted = CryptoJS.AES.decrypt(ciphered, key);

  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}