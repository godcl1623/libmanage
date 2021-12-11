import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineCloseCircle, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { sizes, flex } from '../../../../../styles';
import { metaModalStyles } from '../../../styles/modals/ModalContentsStyles';

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
    <div css={css`${metaModalStyles({ sizes, flex })}`}>
      <span
        className="modal-close"
        onClick={e => {
          dispatch(modalStateCreator(false));
          dispatch(selectedMediaIdCreator(''));
        }}
      >
        <AiOutlineCloseCircle />
      </span>
      <div className="contents-wrapper">
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
                    />
                  )
            : ''
        }
        <div className="btn-wrapper">
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