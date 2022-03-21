import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { modalStateCreator, selectedMediaIdCreator } from '../../actions';
import modalBgStyle from './styles/modalBgStyle';
import { RootState } from '../../reducers';
// 테스트
import { useAppSelector, useAppDispatch, setModalState, setSelMediaId } from '../../slices';

// props 타입 설정 필요
const Modal = ({ style, contents, origin }: any) => {
  // const modalState = useSelector((state: RootState) => state.modalState);
  // const selMediaId = useSelector((state: RootState) => state.selectedMediaId);
  const dispatch = useDispatch();
  // 테스트
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
            // dispatch(modalStateCreator(false));
            appDispatch(setModalState(false));
            if (selMediaId !== '') {
              // dispatch(selectedMediaIdCreator(''));
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