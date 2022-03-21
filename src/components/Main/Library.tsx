/* eslint-disable no-else-return */
import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
import {
  libraryBalloonWrapper,
  libraryBalloonStyle,
  libraryBalloonHand
} from './styles/balloons/LibraryBalloonStyle';
import { RootState } from '../../reducers';
import { StyleSet } from '../../custom_modules/commonUtils';
// 테스트
import {
  useAppDispatch,
  useAppSelector,
  setBalloonState,
  setBalloonOrigin,
  setLibDisplay,
  setExtCredStat,
  setSelItem,
  setSelItemData,
  setModalOrigin
} from '../../slices';

// const MemoedIco = memo(FaBars);
// const MemoedBalloon = memo(Balloon);
// const MemoedLibOpt = memo(LibraryOptions);
// const MemoedLists = memo(MakeList);

type PropsType = {
  userLib: Record<string, string>;
  coverSize: number;
  setCoverSize: React.Dispatch<React.SetStateAction<number>>;
};

const Library = ({ userLib, coverSize, setCoverSize }: PropsType) => {
  // const balloonState = useSelector((state: RootState) => state.balloonState);
  // const balloonOrigin = useSelector((state: RootState) => state.balloonOrigin);
  // const libDisplay = useSelector((state: RootState) => state.libDisplay);
  // const selectedCategory = useSelector((state: RootState) => state.selectedCategory);
  // const selectedStores = useSelector((state: RootState) => state.selectedStores);
  // const userState = useSelector((state: RootState) => state.userState);
  // const extCredState = useSelector((state: RootState) => state.extCredState);
  // const librarySearch = useSelector((state: RootState) => state.librarySearch);
  const [btnCoords, setBtnCoords] = React.useState({});
  const dispatch = useDispatch();
  // 테스트
  const balloonState = useAppSelector(state => state.sliceReducers.balloonState);
  const balloonOrigin = useAppSelector(state => state.sliceReducers.balloonOrigin);
  const libDisplay = useAppSelector(state => state.sliceReducers.libDisplay);
  const selectedCategory = useAppSelector(state => state.sliceReducers.selectedCategory);
  const selectedStores = useAppSelector(state => state.sliceReducers.selectedStores);
  const userState = useAppSelector(state => state.sliceReducers.userState);
  const extCredState = useAppSelector(state => state.sliceReducers.extCredState);
  const librarySearch = useAppSelector(state => state.sliceReducers.librarySearch);
  const appDispatch = useAppDispatch();
  const location = useLocation();
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const updateBtnCoords = (...args: number[]) => {
    const [left, top, height] = args;
    setBtnCoords(prevState => ({
      ...prevState,
      leftCoord: left,
      topCoord: top,
      btnHeight: height
    }));
  };

  useEffect(() => {
    const abortCon = new AbortController();
    const { left, top, height } = (ref.current as HTMLElement).getBoundingClientRect();
    updateBtnCoords(left, top, height);
    return () => {
      abortCon.abort();
    };
  }, []);

  return (
    <article
      id="library"
      css={css`
        ${libraryStyle({ flex, sizes } as StyleSet, libDisplay)}
      `}
    >
      <button
        className="option"
        onClick={() => {
          // dispatch(balloonOriginCreator('Library'));
          appDispatch(setBalloonOrigin('Library'));
          if (balloonState === 'none') {
            // dispatch(balloonStateCreator('flex'));
            appDispatch(setBalloonState('flex'));
          } else if (balloonOrigin === 'Library') {
            // dispatch(balloonStateCreator('none'));
            appDispatch(setBalloonState('none'));
          }
        }}
        ref={ref}
      >
        {<FaBars />}
      </button>
      <Balloon
        contents={
          <LibraryOptions
            // dispatch={dispatch}
            dispatch={appDispatch}
            // changeState={libDisplayStateCreator}
            changeState={setLibDisplay}
            coverSize={coverSize}
            setCoverSize={setCoverSize}
            currDisplayType={libDisplay}
          />
        }
        display={libraryBalloonWrapper(balloonOrigin, balloonState)}
        style={libraryBalloonStyle({ sizes } as StyleSet, {
          balloonOrigin,
          balloonState,
          btnCoords
        })}
        hand={libraryBalloonHand({ btnCoords, balloonOrigin, balloonState })}
      />
      <ul
        id="contents-lists"
        onScroll={e => {
          let timer;
          const htmlTarget = e.target as HTMLElement;
          const lists = htmlTarget.querySelectorAll('li');
          const ulCoords = htmlTarget.getBoundingClientRect();
          const { top: ulTop, bottom: ulBot } = ulCoords;
          if (!timer) {
            timer = setTimeout(() => {
              timer = null;
              lists.forEach(list => {
                const listCoords = list.getBoundingClientRect();
                const { top: liTop, height: liHeight } = listCoords;
                if (liTop + liHeight / 2 < ulTop || liTop + liHeight / 2 > ulBot) {
                  list.style.filter = 'blur(0.104vw)';
                  list.style.color = 'lightgrey';
                  list.style.transition = 'filter 0.5s, color 0.5s';
                } else {
                  list.style.filter = 'blur(0)';
                  list.style.color = 'black';
                  list.style.transition = 'filter 0.5s, color 0.5s';
                }
              });
            }, 200);
          }
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
            // dispatch,
            // extCredStateCreator,
            // selectedItemCreator,
            // selectedItemDataCreator,
            dispatch: appDispatch,
            extCredStateCreator: setExtCredStat,
            selectedItemCreator: setSelItem,
            selectedItemDataCreator: setSelItemData,
            librarySearch,
            // modalOriginCreator,
            modalOriginCreator: setModalOrigin,
            location
          }}
        />
      </ul>
    </article>
  );
};

export default Library;
