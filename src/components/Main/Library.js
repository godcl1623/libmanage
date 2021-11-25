/* eslint-disable no-else-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaBars } from 'react-icons/fa';
import Balloon from '../Modal/Balloon';
import {
  balloonStateCreator,
  balloonOriginCreator,
  libDisplayStateCreator,
  extCredStateCreator,
  selectedItemCreator,
  selectedItemDataCreator,
  modalOriginCreator
} from '../../actions';
import { sendTo } from '../../custom_modules/address';
import { sizes, flex, border } from '../../styles';

const Options = ({ dispatch, changeState, coverSize, setCoverSize, currDisplayType }) => (
  <>
    <div
      className="balloon-display"
      css={css`
        // margin: 10px;
        margin: 0.521vw;
        ${flex.horizontal}
        justify-content: space-between;
        ${sizes.free('100%')}

        * {
          // margin: 0 5px;
          margin: 0 0.26vw;
        }

        .balloon-header {
          flex: 1;
        }

        .btn-container {
          flex: 2;
          ${flex.horizontal}
          justify-content: space-around;

          .balloon-btn {
            // padding: 5px;
            padding: 0.26vw;
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
      `}
    >
      <input
        type="range"
        className="balloon-cover_size"
        name="cover_size"
        min="5"
        max="15"
        value={coverSize}
        css={css`
          // margin: 10px;
          margin: 0.521vw;
          padding: 0;
          width: 100%;
        `}
        onChange={e => {
          setCoverSize(Number(e.target.value));
        }}
      />
      <p>{coverSize}</p>
    </div>
  </>
);

const makeList = (...args) => {
  const [
    source,
    displayState,
    size,
    selectedCategory,
    selectedStore,
    userState,
    extCredState,
    dispatch,
    setExtCred,
    selectItem,
    selItemData,
    search
  ] = args;
  if (source !== '') {
    if (selectedCategory === 'all' || selectedCategory === 'game') {
      if (selectedStore.includes('all') || selectedStore.includes('steam')) {
        const { steam } = source;
        if (displayState === 'list') {
          const result = steam.map((item, index) => (
            <li
              key={index}
              css={css`
                // padding: 10px 30px;
                // font-size: 20px;
                padding: 0.521vw 1.563vw;
                font-size: 1.042vw;
                cursor: pointer;
                background: white;
              `}
              onMouseEnter={e => {
                e.target.style.background = 'var(--highlight-light)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'white';
              }}
              onMouseDown={e => {
                e.target.style.background = 'var(--btn-active)';
              }}
              onMouseUp={e => {
                e.target.style.background = 'var(--highlight-light)';
              }}
              onClick={e => {
                dispatch(modalOriginCreator('Library'));
                selectItem(e.target.innerText);
                if (extCredState.cid === undefined) {
                  axios
                    .post(
                      // 'http://localhost:3001/api/connect',
                      `https://${sendTo}/api/connect`,
                      { execute: 'order66' },
                      { withCredentials: true }
                    )
                    .then(res => {
                      dispatch(setExtCred(res.data));
                      const reqData = {
                        reqUser: userState.nickname,
                        selTitle: item.title,
                        credData: res.data
                      };
                      axios
                        .post(
                          // 'http://localhost:3001/get/meta',
                          `https://${sendTo}/get/meta`,
                          { reqData },
                          { withCredentials: true }
                        )
                        .then(res => {
                          selItemData(res.data);
                        });
                    });
                } else {
                  const reqData = {
                    reqUser: userState.nickname,
                    selTitle: item.title,
                    credData: extCredState
                  };
                  axios
                    // .post('http://localhost:3001/get/meta', { reqData }, { withCredentials: true })
                    .post(`https://${sendTo}/get/meta`, { reqData }, { withCredentials: true })
                    .then(res => {
                      selItemData(res.data);
                    });
                }
              }}
            >
              {item.title}
            </li>
          ));
          if (search === '') {
            return result;
          } else {
            const word = new RegExp(search, 'gi');
            return result.filter(ele => ele.props.children.match(word));
          }
        } else if (displayState === 'cover') {
          const result = steam.map((item, index) => (
            <li
              key={`img-${index}`}
              css={css`
                // margin: 10px;
                margin: 0.521vw;
                height: ${size}vw;
                flex: 0 0 10%;
                ${flex.horizontal}
                cursor: pointer;

                :active {
                  -webkit-transform: scale(0.95);
                      -ms-transform: scale(0.95);
                          transform: scale(0.95);
                }
              `}
            >
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover}.png`}
                title={`${item.title}`}
                alt={`${item.title}-cover`}
                style={{
                  height: '100%'
                }}
                onMouseEnter={e => {
                  e.target.style.filter = 'brightness(0.75)';
                }}
                onMouseLeave={e => {
                  e.target.style.filter = 'brightness(1)';
                }}
                onClick={e => {
                  dispatch(modalOriginCreator('Library'));
                  selectItem(e.target.title);
                  if (extCredState.cid === undefined) {
                    axios
                      .post(
                        // 'http://localhost:3001/api/connect',
                        `https://${sendTo}/api/connect`,
                        { execute: 'order66' },
                        { withCredentials: true }
                      )
                      .then(res => {
                        dispatch(setExtCred(res.data));
                        const reqData = {
                          reqUser: userState.nickname,
                          selTitle: item.title,
                          credData: res.data
                        };
                        axios
                          .post(
                            // 'http://localhost:3001/get/meta',
                            `https://${sendTo}/get/meta`,
                            { reqData },
                            { withCredentials: true }
                          )
                          .then(res => {
                            selItemData(res.data);
                          });
                      });
                  } else {
                    const reqData = {
                      reqUser: userState.nickname,
                      selTitle: item.title,
                      credData: extCredState
                    };
                    axios
                      .post(
                        // 'http://localhost:3001/get/meta',
                        `https://${sendTo}/get/meta`,
                        { reqData },
                        { withCredentials: true }
                      )
                      .then(res => {
                        selItemData(res.data);
                      });
                  }
                }}
              />
            </li>
          ));
          if (search === '') {
            return result;
          } else {
            const word = new RegExp(search, 'gi');
            return result.filter(ele => ele.props.children.props.title.match(word));
          }
        }
      }
    }
  }
};

const Library = ({ userLib }) => {
  // const [balloonState, setBalloonState] = React.useState('none');
  const balloonState = useSelector(state => state.balloonState);
  const balloonOrigin = useSelector(state => state.balloonOrigin);
  const libDisplay = useSelector(state => state.libDisplay);
  const selectedCategory = useSelector(state => state.selectedCategory);
  const selectedStores = useSelector(state => state.selectedStores);
  const userState = useSelector(state => state.userState);
  const extCredState = useSelector(state => state.extCredState);
  const librarySearch = useSelector(state => state.librarySearch);
  const [btnCoords, setBtnCoords] = React.useState({});
  const [coverSize, setCoverSize] = React.useState(10);
  const [localSelectedItem, setLocalSelectedItem] = React.useState('');
  const [localSelectedItemData, setLocalSelectedItemData] = React.useState({});
  // const [apiAuth, setApiAuth] = React.useState('');
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

  const wrapper = {
    display: balloonOrigin === 'Library' ? balloonState : 'none',
    position: 'absolute',
    top: '0',
    right: '0',
    zIndex: 2
  };

  const style = {
    // padding: '20px',
    padding: '1.042vw',
    display: balloonOrigin === 'Library' ? balloonState : 'none',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '300px',
    // height: '150px',
    width: '15.625vw',
    height: '7.813vw',
    position: 'absolute',
    // top: `calc(${btnCoords.topCoord}px + 40px)`,
    top: `calc(${btnCoords.topCoord / 19.2}vw + 2.083vw)`,
    // right: `30px`,
    right: `1.563vw`,
    background: 'var(--btn-active)',
    zIndex: 2
  };

  const hand = {
    // borderLeft: '20px solid transparent',
    // borderRight: '20px solid transparent',
    // borderBottom: '40px solid var(--btn-active)',
    borderLeft: '1.042vw solid transparent',
    borderRight: '1.042vw solid transparent',
    borderBottom: '2.083vw solid var(--btn-active)',
    position: 'absolute',
    // top: `calc(${btnCoords.topCoord}px)`,
    // right: `30px`,
    top: `calc(${btnCoords.topCoord / 19.2}vw)`,
    right: `1.563vw`,
    display: balloonOrigin === 'Library' ? balloonState : 'none'
  };

  return (
    <article
      id="library"
      css={css`
        // border-left: 1px solid black;
        // border-right: 1px solid black;
        // padding: 40px 20px;
        border-left: 0.052vw solid black;
        border-right: 0.052vw solid black;
        padding: 2.083vw 1.042vw;
        flex: 2;
        overflow: hidden;
        height: 100%;
        position: relative;
        background: white;
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
          // right: 30px;
          right: 1.563vw;
          ${sizes.free('2.604vw', '1.823vw')}
          z-index: 2;
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
        `}
      >
        { <FaBars /> }
      </button>
      <Balloon
        contents={
          <Options
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
          ${sizes.free('100%', 'calc(100%)')}
          flex-wrap: wrap;
          overflow: scroll;
        `}
        onScroll={e => {
          const lists = e.target.querySelectorAll('li');
          const ulCoords = e.target.getBoundingClientRect();
          const { top: ulTop, bottom: ulBot } = ulCoords;
          lists.forEach(list => {
            const listCoords = list.getBoundingClientRect();
            const { top: liTop, height: liHeight } = listCoords;
            if (liTop+(liHeight / 2) < ulTop || liTop + (liHeight / 2) > ulBot) {
              // list.style.filter = 'blur(2px)';
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
        {makeList(
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
          librarySearch
        )}
      </ul>
      {/* { testBtns(apiAuth, setApiAuth) } */}
    </article>
  );
};

export default Library;
