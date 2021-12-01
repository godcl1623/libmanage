import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { modalStateCreator, selectedMediaIdCreator } from '../../actions';

const Modal = ({ style, contents, origin }) => {
  const modalState = useSelector(state => state.modalState);
  const selMediaId = useSelector(state => state.selectedMediaId);
  const dispatch = useDispatch();
  const display = !modalState ? 'none' : 'block';
  return ReactDOM.createPortal(
    <div
      className="modal-bg"
      css={css`
        display: ${display};
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        top: 0;
        left: 0;
        z-index: 2;
        pointer-events: ${origin === 'Library' ? 'none' : 'auto'};
      `}
      onClick={e => {
        // e.preventDefault();
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