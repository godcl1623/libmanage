import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineCloseCircle, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { sizes, flex } from '../../../../../styles';

const ModalMetaMedia = ({ props }) => {
  const {
    dispatch,
    modalStateCreator,
    selectedMediaId,
    selectedMediaIdCreator,
    selectedMediaList,
    target
  } = props;

  return (
    <div
      css={css`
        padding: calc(var(--gap-standard) * 2);
        ${sizes.full}
        ${flex.vertical}
        position: relative;
      `}
    >
      <span
        className="modal-close"
        css={css`
          border-radius: 50%;
          position: absolute;
          top: -1.667vw;
          right: -1.667vw;
          cursor: pointer;
          background: white;
          ${flex.vertical}
          ${sizes.free('1.667vw', '1.667vw')}

          svg {
            font-size: 1.667vw;
          }

          @media (orientation: portrait) {
            top: -${1.667 * 1.778}vw;
            right: -${1.667 * 1.778}vw;
            ${sizes.free(`${1.667 * 1.778}vw`, `${1.667 * 1.778}vw`)}

            svg {
              font-size: ${1.667 * 1.778}vw;
            }
          }
        `}
        onClick={e => {
          dispatch(modalStateCreator(false));
          dispatch(selectedMediaIdCreator(''));
        }}
      >
        <AiOutlineCloseCircle />
      </span>
      <div
        className="contents-wrapper"
        css={css`
          ${sizes.full}
        `}
      >
        {
          selectedMediaId
            ? target === 'videos'
                ?
                  (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedMediaId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )
                :
                  (
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_original/${selectedMediaId}.jpg`}
                      alt="media"
                      id={`img-${selectedMediaId}`}
                      css={css`
                        ${sizes.full}
                        color: white;
                      `}
                    />
                  )
            : ''
        }
        <div
          className="btn-wrapper"
          css={css`
            ${sizes.free('calc(100% - 4.167vw)', 'calc(100% - 4.167vw)')}
            ${flex.horizontal}
            justify-content: space-between;
            position: absolute;
            top: calc(var(--gap-standard) * 2);
            left: calc(var(--gap-standard) * 2);

            span {
              ${flex.vertical}
              ${sizes.free('15%', '100%')}
              background: rgba(0, 0, 0, 0.5);
              opacity: 0;
              color: white;
              font-size: 5.208vw;
              text-weight: 900;
              transition: all 0.3s;

              * {
                color: white;
              }

              :hover {
                opacity: 100%;
                cursor: pointer;
              }

              :active {
                -webkit-filter: brightness(0.3);
                filter: brightness(0.3);
              }
            }

            @media (orientation: portrait) {
              ${sizes.free(
                `calc(100% - ${4.167 * 1.778}vw)`,
                `calc(100% - ${4.167 * 1.778}vw)`
              )}

              span {
                font-size: ${5.208 * 1.778}vw;
              }
            }
          `}
        >
          <span
            id="media-left"
            onClick={e => {
              const currIdx = selectedMediaList.indexOf(selectedMediaId);
              if (currIdx === 0) {
                dispatch(selectedMediaIdCreator(selectedMediaList[selectedMediaList.length - 1]));
              } else {
                dispatch(selectedMediaIdCreator(selectedMediaList[currIdx - 1]));
              }
            }}
          >
            <AiOutlineLeft />
          </span>
          <span
            id="media-right"
            onClick={e => {
              const currIdx = selectedMediaList.indexOf(selectedMediaId);
              if (currIdx === selectedMediaList.length - 1) {
                dispatch(selectedMediaIdCreator(selectedMediaList[0]));
              } else {
                dispatch(selectedMediaIdCreator(selectedMediaList[currIdx + 1]));
              }
            }}
          >
            <AiOutlineRight />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ModalMetaMedia;