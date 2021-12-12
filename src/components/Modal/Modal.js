import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { modalStateCreator, selectedMediaIdCreator } from '../../actions';
import modalBgStyle from './styles/modalBgStyle';

const Modal = ({ style, contents, origin }) => {
  const modalState = useSelector(state => state.modalState);
  const selMediaId = useSelector(state => state.selectedMediaId);
  const dispatch = useDispatch();
  const display = !modalState ? 'none' : 'block';
  return ReactDOM.createPortal(
    <div
      className="modal-bg"
      css={css`${modalBgStyle({ display, origin })}`}
      onClick={e => {
        if (typeof e.target.className === 'string') {
          if (e.target.className.split(' ')[0] === 'modal-bg') {
            dispatch(modalStateCreator(false));
            if (selMediaId !== '') {
              dispatch(selectedMediaIdCreator(''));
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
    document.querySelector('#modal')
  );
}
export default Modal;