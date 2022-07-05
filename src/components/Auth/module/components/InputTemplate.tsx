const InputTemplate = ({ inputType, labelText, inputFor, handler, placeholder }: any): any => (
  <>
    <label htmlFor={inputFor}>{ labelText }</label>
    <input type={inputType} name={inputFor} onChange={handler} placeholder={placeholder} />
  </>
);

export default InputTemplate;