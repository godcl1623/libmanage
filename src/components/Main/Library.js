/* eslint-disable no-else-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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

const Options = ({ dispatch, changeState, coverSize, setCoverSize }) => (
  <>
    <h3
      className="balloon-header"
    >표시방식:</h3>
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
    <input
      type="range"
      className="balloon-cover_size"
      name="cover_size"
      min="5"
      max="15"
      value={coverSize}
      onChange={e => {
        setCoverSize(Number(e.target.value));
      }}
    />
    <p>{coverSize}</p>
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
              onClick={e => {
                dispatch(modalOriginCreator('Library'));
                selectItem(e.target.innerText);
                if (extCredState.cid === undefined) {
                  axios
                    .post(
                      // 'http://localhost:3003/api/connect',
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
                          // 'http://localhost:3003/get/meta',
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
                    // .post('http://localhost:3003/get/meta', { reqData }, { withCredentials: true })
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
              style={{
                margin: '10px',
                height: `${size}vw`,
                flex: '0 0 10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover}.png`}
                title={`${item.title}`}
                alt={`${item.title}-cover`}
                style={{
                  height: '100%'
                }}
                onClick={e => {
                  dispatch(modalOriginCreator('Library'));
                  selectItem(e.target.title);
                  if (extCredState.cid === undefined) {
                    axios
                      .post(
                        // 'http://localhost:3003/api/connect',
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
                            // 'http://localhost:3003/get/meta',
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
                        // 'http://localhost:3003/get/meta',
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
  const testState = useSelector(state => state._TEST);
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
    left: '0',
    // 'background': 'rgba(0, 0, 0, 0.3)',
    // width: '100%',
    // height: '100%',
    zIndex: 2
  };

  const style = {
    padding: '20px',
    display: balloonOrigin === 'Library' ? balloonState : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    width: '300px',
    height: '100px',
    position: 'absolute',
    top: `20px`,
    left: `100px`,
    background: 'white',
    zIndex: 2
  };

  const hand = {
    width: '50px',
    height: '50px',
    position: 'absolute',
    top: `calc(${btnCoords.topCoord}px + 25px)`,
    left: `calc(${btnCoords.leftCoord}px + 50px)`,
    // 'transform': 'translate(-100%, -50%)',
    background: 'white',
    display: balloonOrigin === 'Library' ? balloonState : 'none'
  };

  return (
    <article
      id="library"
      css={css`
        border-left: 1px solid black;
        border-right: 1px solid black;
        padding: 20px;
        padding-bottom: 0;
        flex: 2;
        overflow: hidden;
        height: 100%;
        position: relative;
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
          height: 30px;
          // position: absolute;
          // right: 30px;
        `}
      >
        옵션
      </button>
      <Balloon
        contents={
          <Options
            dispatch={dispatch}
            changeState={libDisplayStateCreator}
            coverSize={coverSize}
            setCoverSize={setCoverSize}
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
          ${sizes.free('100%', '100%')}
          flex-wrap: wrap;
          overflow: scroll;
        `}
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
          testState
        )}
      </ul>
      {/* { testBtns(apiAuth, setApiAuth) } */}
    </article>
  );
};

export default Library;
