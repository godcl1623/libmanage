import React, { memo, lazy, Suspense } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineCloseCircle, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { sizes, flex } from '../../../../../styles';
import { metaModalStyles } from '../../../styles/modals/ModalContentsStyles';

const MediaContents = lazy(() => import('./MediaContents'));

const MemoedCircle = memo(AiOutlineCloseCircle);
const MemoedRight = memo(AiOutlineRight);
const MemoedLeft = memo(AiOutlineLeft);
const MemoedMedia = memo(MediaContents);

const fallBack = () => (
  <h1
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    Loading
  </h1>
);

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
        <MemoedCircle />
      </span>
      <div className="contents-wrapper">
        {
          selectedMediaId
            ?
              <Suspense fallback={fallBack()}>
                <MemoedMedia type={target} id={selectedMediaId}/>
              </Suspense>
            :
              ''
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
            <MemoedLeft />
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
            <MemoedRight />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ModalMetaMedia;