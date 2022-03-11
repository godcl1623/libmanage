import React, { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalStateCreator } from '../../../../actions';
import { Button } from '../../../../styles/elementsPreset';

const MemoedBtn = memo(Button);

const FormSubmit = ({ formOrigin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Button type="submit" name="confirm">확인</Button>
      <Button
        name="cancel"
        onClick={e => {
          e.preventDefault();
          if (window.confirm(`정말 취소하시겠습니까?\n작성한 데이터가 전부 삭제됩니다.`)) {
            formOrigin === 'Main' || (location.pathname === '/offline' || !navigator.onLine)
              ? dispatch(modalStateCreator(false))
              : navigate('/');
          }
        }}>취소</Button>
    </>
  );
};

export default FormSubmit;