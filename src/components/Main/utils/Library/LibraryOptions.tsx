import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flex, sizes } from '../../../../styles';
import { libBalloonDisplay, libBalloonInput } from '../../styles/LibraryStyles';
import { StyleSet, SetSize } from '../../../../custom_modules/commonUtils';

// props 타입 체크 필요
const LibraryOptions = ({ dispatch, changeState, coverSize, setCoverSize, currDisplayType, isMobile }: any) => (
  <>
    {
      isMobile
        ?
          <div
            id="mobile_close"
            css={css`
              border: 1px solid black;
              border-radius: 50%;
              position: absolute;
              top: 10px;
              right: 10px;
              ${(sizes as unknown as SetSize).free('25px', '25px')}
              display: flex;
              font-weight: bold;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            `}
          >
            X
          </div>
        :
          ''
    }
    <div
      className="balloon-display"
      css={css`${libBalloonDisplay({ flex, sizes } as StyleSet, { currDisplayType })}`}
    >
      <h3
        className="balloon-header"
      >표시방식:</h3>
      <div className="btn-container">
        <button
          className="balloon-btn"
          onClick={e => {
            e.preventDefault();
            dispatch(changeState('list'));
          }}
        >
          리스트
        </button>
        <button
          className="balloon-btn"
          onClick={e => {
            e.preventDefault();
            dispatch(changeState('cover'));
          }}
        >
          썸네일
        </button>
      </div>
    </div>
    <div
      className="balloon-input"
      css={css`${libBalloonInput({ flex, sizes } as StyleSet)}`}
    >
      <input
        type="range"
        className="balloon-cover_size"
        name="cover_size"
        min="5"
        max="15"
        defaultValue={coverSize}
        onChange={e => {
          setCoverSize(Number(e.target.value));
        }}
      />
      <p>{coverSize}</p>
    </div>
  </>
);

export default LibraryOptions;