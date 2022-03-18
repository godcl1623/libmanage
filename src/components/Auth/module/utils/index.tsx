/* 반환 타입 지정 필요 */

export const verifyId = (string: string) => {
  const form = /^[A-Za-z0-9]{6,12}$/;
  return form.test(string);
};

export const verifyPwd = (string: string) => {
  // const form = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*]).{8,16}$/;
  const form = /^[A-Za-z0-9!@#$%^&*]{8,16}$/;
  return form.test(string);
};

export const verifyNick = (string: string) => {
  const form = /^[가-힣a-zA-Z0-9]{2,10}$/;
  return form.test(string);
};

export const verifyEmail = (string: string) => {
  const form = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;
  return form.test(string);
};

export const getRandom = () => String(Math.random()).split('.')[1].slice(0, 6);