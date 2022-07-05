import { MouseEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../../../styles/elementsPreset';
import { useAppDispatch, setModalState } from '../../../../slices';

const FormSubmit = ({ formOrigin }: any) => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Button type="submit" name="confirm">확인</Button>
      <Button
        name="cancel"
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          if (window.confirm(`정말 취소하시겠습니까?\n작성한 데이터가 전부 삭제됩니다.`)) {
            formOrigin === 'Main' || (location.pathname === '/offline' || !navigator.onLine)
              ? appDispatch(setModalState(false))
              : navigate('/');
          }
        }}>취소</Button>
    </>
  );
};

export default FormSubmit;