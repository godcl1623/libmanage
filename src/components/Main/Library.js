/* eslint-disable no-else-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaBars } from 'react-icons/fa';
import Balloon from '../Modal/Balloon';
import LibraryOptions from './utils/Library/LibraryOptions';
import MakeList from './utils/Library/MakeList';
import {
  balloonStateCreator,
  balloonOriginCreator,
  libDisplayStateCreator,
  extCredStateCreator,
  selectedItemCreator,
  selectedItemDataCreator,
  modalOriginCreator
} from '../../actions';
import { sizes, flex } from '../../styles';
import { libraryStyle } from './styles/LibraryStyles';
import { libraryBalloonWrapper, libraryBalloonStyle, libraryBalloonHand } from './styles/balloons/LibraryBalloonStyle';

const Library = ({ userLib, coverSize, setCoverSize }) => {
  const balloonState = useSelector(state => state.balloonState);
  const balloonOrigin = useSelector(state => state.balloonOrigin);
  const libDisplay = useSelector(state => state.libDisplay);
  const selectedCategory = useSelector(state => state.selectedCategory);
  const selectedStores = useSelector(state => state.selectedStores);
  const userState = useSelector(state => state.userState);
  const extCredState = useSelector(state => state.extCredState);
  const librarySearch = useSelector(state => state.librarySearch);
  const [btnCoords, setBtnCoords] = React.useState({});
  const dispatch = useDispatch();
  const ref = React.useRef();
  const updateBtnCoords = (left, top, height) => {
    setBtnCoords(prevState => ({
      ...prevState,
      leftCoord: left,
      topCoord: top,
      btnHeight: height
    }));
  };

  useEffect(() => {
    const abortCon = new AbortController();
    const { left, top, height } = ref.current.getBoundingClientRect();
    updateBtnCoords(left, top, height);
    return () => {
      abortCon.abort();
    }
  }, []);

  return (
    <article
      id="library"
      css={css`${libraryStyle({ flex, sizes }, libDisplay)}`}
    >
      <button
        className="option"
        onClick={() => {
          dispatch(balloonOriginCreator('Library'));
          if (balloonState === 'none') {
            dispatch(balloonStateCreator('flex'));
          } else if (balloonOrigin === 'Library') {
            dispatch(balloonStateCreator('none'));
          }
        }}
        ref={ref}
      >
        { <FaBars /> }
      </button>
      <Balloon
        contents={
          <LibraryOptions
            dispatch={dispatch}
            changeState={libDisplayStateCreator}
            coverSize={coverSize}
            setCoverSize={setCoverSize}
            currDisplayType={libDisplay}
          />
        }
        display={libraryBalloonWrapper(balloonOrigin, balloonState)}
        style={libraryBalloonStyle({ sizes }, { balloonOrigin, balloonState, btnCoords })}
        hand={libraryBalloonHand({ btnCoords, balloonOrigin, balloonState })}
      />
      <ul
        id="contents-lists"
        onScroll={e => {
          const lists = e.target.querySelectorAll('li');
          const ulCoords = e.target.getBoundingClientRect();
          const { top: ulTop, bottom: ulBot } = ulCoords;
          lists.forEach(list => {
            const listCoords = list.getBoundingClientRect();
            const { top: liTop, height: liHeight } = listCoords;
            if (liTop+(liHeight / 2) < ulTop || liTop + (liHeight / 2) > ulBot) {
              list.style.filter = 'blur(0.104vw)';
              list.style.color = 'lightgrey';
              list.style.transition = 'filter 0.5s, color 0.5s';
            } else {
              list.style.filter = 'blur(0)';
              list.style.color = 'black';
              list.style.transition = 'filter 0.5s, color 0.5s';
            }
          });
        }}
      >
        <MakeList
          args={{
            userLib,
            libDisplay,
            coverSize,
            selectedCategory,
            selectedStores,
            userState,
            extCredState,
            dispatch,
            extCredStateCreator,
            selectedItemCreator,
            selectedItemDataCreator,
            librarySearch,
            modalOriginCreator
          }}
        />
      </ul>
    </article>
  );
};

export default Library;
