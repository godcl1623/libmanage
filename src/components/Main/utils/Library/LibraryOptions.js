import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flex, sizes } from '../../../../styles';

const LibraryOptions = ({ dispatch, changeState, coverSize, setCoverSize, currDisplayType }) => (
  <>
    <div
      className="balloon-display"
      css={css`
        margin: calc(var(--gap-multiply-small) * 2);
        ${flex.horizontal}
        justify-content: space-between;
        ${sizes.free('100%')}

        * {
          margin: 0 var(--gap-multiply-small);
        }

        .balloon-header {
          flex: 1;
        }

        .btn-container {
          flex: 2;
          ${flex.horizontal}
          justify-content: space-around;

          .balloon-btn {
            padding: var(--gap-multiply-small);
            cursor: pointer;
            :hover {
              -webkit-filter: brightness(90%);
                      filter: brightness(90%);
            }
          
            :active {
              -webkit-transform: scale(0.95);
                  -ms-transform: scale(0.95);
                      transform: scale(0.95);
            }
          }

          .balloon-btn:first-of-type {
            background: ${currDisplayType === 'list' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
          }
  
          .balloon-btn:last-of-type {
            background: ${currDisplayType === 'cover' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
          }
        }

        @media (orientation: portrait) {
          @media (max-width: 599px) {
            margin: calc(var(--gap-multiply-small));
            ${sizes.free('100%')}

            * {
              margin: 0 var(--gap-multiply-small);
              font-size: 12px;
            }

            .balloon-header {
              text-align: right;
            }

            .btn-container {
              .balloon-btn {
                padding: var(--gap-multiply-small);
              }
            }
          }
        }
      `}
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
      css={css`
        ${flex.horizontal}
        ${sizes.free('100%')}
        p {
          font-size: var(--font-size-standard);

          @media (orientation: portrait) and (max-width: 599px) {
            font-size: 16px;
          }
        }
      `}
    >
      <input
        type="range"
        className="balloon-cover_size"
        name="cover_size"
        min="5"
        max="15"
        defaultValue={coverSize}
        css={css`
          margin: calc(var(--gap-multiply-small) * 2);
          padding: 0;
          width: 100%;
          cursor: pointer;
        `}
        onChange={e => {
          setCoverSize(Number(e.target.value));
        }}
      />
      <p>{coverSize}</p>
    </div>
  </>
);

export default LibraryOptions;