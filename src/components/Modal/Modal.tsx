import React from 'react';
import ReactDOM from 'react-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import modalBgStyle from './styles/modalBgStyle';
import { useAppSelector, useAppDispatch, setModalState, setSelMediaId } from '../../slices';

// props 타입 설정 필요
const Modal = ({ style, contents, origin }: any) => {
  const modalState = useAppSelector(state => state.sliceReducers.modalState);
  const selMediaId = useAppSelector(state => state.sliceReducers.selectedMediaId);
  const appDispatch = useAppDispatch();
  const display = !modalState ? 'none' : 'block';
  return ReactDOM.createPortal(
    <div
      className="modal-bg"
      css={css`${modalBgStyle({ display, origin })}`}
      onClick={e => {
        if (typeof (e.target as HTMLElement).className === 'string') {
          if ((e.target as HTMLElement).className.split(' ')[0] === 'modal-bg') {
            appDispatch(setModalState(false));
            if (selMediaId !== '') {
              appDispatch(setSelMediaId(''));
            }
          }
        }
      }}
    >
      <div
        className="modal-body"
        css={css`
          ${style}
        `}
      >
        { contents }
      </div>
    </div>,
    document.querySelector('#modal') as HTMLElement
  );
}
export default Modal;