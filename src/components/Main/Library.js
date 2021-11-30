/* eslint-disable no-else-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
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
  const [localSelectedItem, setLocalSelectedItem] = React.useState('');
  const [localSelectedItemData, setLocalSelectedItemData] = React.useState({});
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

  useEffect(() => {
    const abortCon = new AbortController();
    dispatch(selectedItemCreator(localSelectedItem));
    dispatch(selectedItemDataCreator(localSelectedItemData));
    return () => {
      abortCon.abort();
    }
  }, [localSelectedItem, localSelectedItemData]);

  const wrapper = `
    display: ${balloonOrigin === 'Library' ? balloonState : 'none'};
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  `;

  const style = `
    padding: var(--gap-standard);
    display: ${balloonOrigin === 'Library' ? balloonState : 'none'};
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    ${sizes.free('15.625vw', '7.813vw')}
    position: absolute;
    top: calc(${btnCoords.topCoord}px + 3.241vh);
    right: 1.563vw;
    background: var(--btn-active);
    z-index: 2;

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        ${sizes.free(`${15.625 * 1.778}vw`, `${7.813 * 1.778}vw`)}
        top: calc(${btnCoords.topCoord}px + ${3.241 / 1.778}vh);
        right: ${1.563 * 1.778}vw;
      }

      @media (max-width: 599px) {
        padding: var(--gap-standard);
        ${sizes.free('100vw', '150px')}
        top: 35px;
        right: 0;
      }
    }
  `;

  const hand = `
    border-left: var(--gap-standard) solid transparent;
    border-right: var(--gap-standard) solid transparent;
    border-bottom: calc(var(--gap-standard) * 2) solid var(--btn-active);
    position: absolute;
    top: calc(${btnCoords.topCoord}px + 0.463vh);
    right: 1.563vw;
    display: ${balloonOrigin === 'Library' ? balloonState : 'none'};

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        top: calc(${btnCoords.topCoord}px + ${0.463 / 1.778}vh);
        right: ${1.563 * 1.778}vw;
      }

      @media (max-width: 599px) {
        display: none;
      }
    }
  `;

  return (
    <article
      id="library"
      css={css`
        border-left: 0.052vw solid black;
        border-right: 0.052vw solid black;
        padding: calc(var(--gap-standard) * 2) var(--gap-standard);
        flex: 2;
        overflow: hidden;
        ${sizes.full}
        position: relative;
        background: white;

        @media (orientation: portrait) {
          @media (max-width: 599px) {
            border: none;
            padding: calc(var(--gap-standard) * 1.5) 0;
          }
        }
      `}
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
        css={css`
          ${flex.vertical}
          position: absolute;
          right: 1.563vw;
          ${sizes.free('2.604vw', '1.823vw')}
          z-index: 1;
          cursor: pointer;
          :hover {
            -webkit-filter: brightness(90%);
                    filter: brightness(90%);
          }
        
          :active {
            -webkit-transform: scale(0.98);
                -ms-transform: scale(0.98);
                    transform: scale(0.98);
          }

          @media (orientation: portrait) {
            @media (min-width: 600px) {
              right: ${1.563 * 1.778}vw;
              ${sizes.free(`${2.604 * 1.778}vw`, `${1.823 * 1.778}vw`)}
            }

            @media (max-width: 599px) {
              top: 0;
              right: 0;
              ${sizes.free('50px', '35px')}
              opacity: 70%;
            }
          }
        `}
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
        display={wrapper}
        style={style}
        hand={hand}
      />
      <ul
        id="contents-lists"
        css={css`
          display: ${libDisplay === 'cover' ? 'flex' : 'inline-block'};
          ${sizes.full}
          flex-wrap: wrap;
          overflow: scroll;

          @media (orientation: portrait) and (max-width: 599px) {
            ${flex.horizontal}
            justify-content: ${libDisplay === 'list' ? 'flex-start' : 'center'};
          }
        `}
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
            setLocalSelectedItem,
            setLocalSelectedItemData,
            librarySearch,
            modalOriginCreator
          }}
        />
      </ul>
    </article>
  );
};

export default Library;
