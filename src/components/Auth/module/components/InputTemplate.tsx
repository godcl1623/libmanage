import React from 'react';

// props 타입 지정 필요
const InputTemplate = ({ inputType, labelText, inputFor, style, handler, placeholder }: any): any => (
  <>
    <label htmlFor={inputFor}>{ labelText }</label>
    <input type={inputType} name={inputFor} onChange={handler} placeholder={placeholder} />
  </>
);

export default InputTemplate;