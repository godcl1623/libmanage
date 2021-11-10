import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalStateCreator } from '../../../../actions';

const FormSubmit = ({ formOrigin }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <button type="submit" name="confirm">확인</button>
      <button
        name="cancel"
        onClick={e => {
          e.preventDefault();
          if (window.confirm(`정말 취소하시겠습니까?\n작성한 데이터가 전부 삭제됩니다.`)) {
            formOrigin === 'Main'
              ? dispatch(modalStateCreator(false))
              : history.push('/');
          }
        }}>취소</button>
    </>
  );
};

export default FormSubmit;