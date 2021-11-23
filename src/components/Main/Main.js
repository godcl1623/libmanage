/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {AiOutlineCloseCircle, AiOutlineRight, AiOutlineLeft} from 'react-icons/ai';
import Header from './Header';
import Library from './Library';
import Meta from './Meta';
import Navigation from './Navigation';
import Modal from '../Modal/Modal';
import MemberInfoWrap from '../Member/MemberInfoWrap';
import {
  loginStatusCreator,
  userStateCreator,
  balloonStateCreator,
  comparisonStateCreator,
  modalStateCreator,
  selectedItemDataCreator,
  selectedMediaIdCreator
} from '../../actions';
import { sendTo } from '../../custom_modules/address';
import { sizes, flex, border } from '../../styles';
import signin from '../../assets/sits_large_noborder.png';

const modalOption = origin => ({
  position: 'absolute',
  width: origin !== 'Header_MemInfo' ? (origin.split('-')[0] === 'meta' ? '90%' : '50%') : '45%',
  height: origin !== 'Header_MemInfo' ? (origin.split('-')[0] === 'meta' ? '90%' : '50%') : '85%',
  background: 'white',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '2'
});

const modalContents = (...args) => {
  const [
    state,
    dispatch,
    setState1,
    setState2,
    origin,
    setLibs,
    setItem,
    selMedia,
    setSelMedia,
    selMediaList
  ] = args;
  const caution = <p>※ 현재 기술적 문제로 Steam 서비스만 지원됩니다.</p>;
  if (origin === 'Header_Option') {
    // 모든 스토어에 대응 가능하도록 개선 필요
    if (
      state.stores === undefined ||
      state.stores.game === undefined ||
      state.stores.game.steam === false
    ) {
      return (
        <article
          css={css`
            padding: 40px 20px;
            ${sizes.full}
            ${flex.vertical}
            align-items: flex-start;
            position: relative;

            h1 {
              margin-left: 40px;
              margin-bottom: 10px;
              font-size: 40px;
            }

            h2, button {
              font-size: 30px;
            }

            hr {
              margin-bottom: 40px;
              ${sizes.free('100%')};
            }

            p {
              position: absolute;
              left: 50%;
              bottom: 30px;
              transform: translateX(-50%);
              font-size: 18px;
            }

            .store_container {
              margin-bottom: auto;
              padding: 0 80px;
              padding-bottom: 10px;
              ${flex.horizontal}
              ${sizes.free('100%')};
              justify-content: space-between;

              button {
                padding: 5px 15px;
              }
            }
          `}
        >
          <h1>스토어 목록</h1>
          <hr />
          <section
            className="store_container"
          >
            <h2>Steam</h2>
            <a
              // href="http://localhost:3001/auth/steam"
              href={`https://${sendTo}/auth/steam`}
            >
              <img
                src={signin}
                alt="sign_in_through_steam"
                title="sign_in_through_steam"
              />
            </a>
          </section>
          {caution}
        </article>
      );
      // eslint-disable-next-line no-else-return
    } else {
      return (
        <article
          css={css`
            padding: 40px 20px;
            ${sizes.full}
            ${flex.vertical}
            align-items: flex-start;
            position: relative;
            background: white;

            h1 {
              margin-left: 40px;
              margin-bottom: 10px;
              font-size: 40px;
            }

            h2, button {
              font-size: 30px;
            }

            hr {
              margin-bottom: 40px;
              ${sizes.free('100%')};
            }

            p {
              position: absolute;
              left: 50%;
              bottom: 30px;
              transform: translateX(-50%);
              font-size: 18px;
            }

            .store_container {
              margin-bottom: auto;
              padding: 0 80px;
              padding-bottom: 10px;
              ${flex.horizontal}
              ${sizes.free('100%')};
              justify-content: space-between;

              button {
                padding: 5px 15px;
                background: var(--btn-alert);
                color: var(--white);
              }
            }
          `}
        >
          <h1>스토어 목록</h1>
          <hr />
          <section className="store_container">
            <h2>Steam</h2>
            <button
              onClick={e => {
                const temp = state;
                temp.stores.game.steam = false;
                // 반영을 위해서는 comparisonState 변경이 필요
                axios
                .post(
                  // 'http://localhost:3001/disconnect',
                  `https://${sendTo}/disconnect`,
                  { reqUserInfo: JSON.stringify(temp) },
                  { withCredentials: true }
                  )
                  .then(res => {
                    if (res) {
                      dispatch(setState2(false));
                      setLibs('');
                      dispatch(setItem({}));
                      dispatch(setState1(temp));
                    }
                  });
              }}
            >
              연동 해제
            </button>
          </section>
          {caution}
        </article>
      );
    }
  } else if (origin === 'Header_MemInfo') {
    return <MemberInfoWrap />;
  } else if (origin.split('-')[0] === 'meta') {
    if (origin.split('-')[1] === 'videos') {
      return (
        <div
          css={css`
            padding: 40px;
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
              top: -32px;
              right: -32px;
              cursor: pointer;
              background: white;
              ${sizes.free('32px', '32px')}

                svg {
                  font-size: 32px;
                }
            `}
            onClick={e => {
              dispatch(modalStateCreator(false));
              dispatch(setSelMedia(''));
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
              selMedia
              ?
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selMedia}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              : ''
            }
            <div
              className="btn-wrapper"
              css={css`
                ${sizes.free('calc(100% - 80px)', 'calc(100% - 80px)')}
                ${flex.horizontal}
                justify-content: space-between;
                position: absolute;
                top: 40px;
                left: 40px;

                span {
                  ${flex.vertical}
                  ${sizes.free('15%', '100%')}
                  background: rgba(0, 0, 0, 0.5);
                  opacity: 0;
                  color: white;
                  font-size: 100px;
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
              `}
            >
              <span
                id="media-left"
                onClick={e => {
                  const currIdx = selMediaList.indexOf(selMedia);
                  if (currIdx === 0) {
                    dispatch(setSelMedia(selMediaList[selMediaList.length - 1]));
                  } else {
                    dispatch(setSelMedia(selMediaList[currIdx - 1]));
                  }
                }}
              >
                <AiOutlineLeft />
              </span>
              <span
                id="media-right"
                onClick={e => {
                  const currIdx = selMediaList.indexOf(selMedia);
                  if (currIdx === selMediaList.length - 1) {
                    dispatch(setSelMedia(selMediaList[0]));
                  } else {
                    dispatch(setSelMedia(selMediaList[currIdx + 1]));
                  }
                }}
              >
                <AiOutlineRight />
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          css={css`
            padding: 40px;
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
              top: -32px;
              right: -32px;
              cursor: pointer;
              background: white;
              ${sizes.free('32px', '32px')}

                svg {
                  font-size: 32px;
                }
            `}
            onClick={e => {
              dispatch(modalStateCreator(false));
              dispatch(setSelMedia(''));
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
              selMedia
              ?
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_original/${selMedia}.jpg`}
                  alt="media"
                  id={`img-${selMedia}`}
                  css={css`
                    ${sizes.full}
                    color: white;
                  `}
                />
              : ''
            }
            <div
              className="btn-wrapper"
              css={css`
                ${sizes.free('calc(100% - 80px)', 'calc(100% - 80px)')}
                ${flex.horizontal}
                justify-content: space-between;
                position: absolute;
                top: 40px;
                left: 40px;

                span {
                  ${flex.vertical}
                  ${sizes.free('15%', '100%')}
                  background: rgba(0, 0, 0, 0.5);
                  opacity: 0;
                  color: white;
                  font-size: 100px;
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
              `}
            >
              <span
                id="media-left"
                onClick={e => {
                  const currIdx = selMediaList.indexOf(selMedia);
                  if (currIdx === 0) {
                    dispatch(setSelMedia(selMediaList[selMediaList.length - 1]));
                  } else {
                    dispatch(setSelMedia(selMediaList[currIdx - 1]));
                  }
                }}
              >
                <AiOutlineLeft />
              </span>
              <span
                id="media-right"
                onClick={e => {
                  const currIdx = selMediaList.indexOf(selMedia);
                  if (currIdx === selMediaList.length - 1) {
                    dispatch(setSelMedia(selMediaList[0]));
                  } else {
                    dispatch(setSelMedia(selMediaList[currIdx + 1]));
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
  }
  return (
    <article
      css={css`
        pointer-events: none;
        ${flex.vertical}
        ${sizes.full}
      `}
    >
      <h1>Loading...</h1>
    </article>
  );
};

const Main = () => {
  const loginStatus = useSelector(state => state.loginStatus);
  const logoutClicked = useSelector(state => state.logoutClicked);
  const balloonState = useSelector(state => state.balloonState);
  const userState = useSelector(state => state.userState);
  const comparisonState = useSelector(state => state.comparisonState);
  const selectedItem = useSelector(state => state.selectedItem);
  const selectedItemData = useSelector(state => state.selectedItemData);
  const modalOrigin = useSelector(state => state.modalOrigin);
  const modalState = useSelector(state => state.modalState);
  const selectedMediaId = useSelector(state => state.selectedMediaId);
  const selectedMediaList = useSelector(state => state.selectedMediaList);
  const [storesList, setStoresList] = useState('');
  const [userLibrary, setUserLibrary] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const headerRef = React.useRef();

  useEffect(() => {
    // const abortCon = new AbortController();
    const checkLogin = async () => {
      const message = {
        comparisonState,
        million: localStorage.getItem('frog')
      };
      await axios
        .post(
          // 'http://localhost:3001/check_login',
          `https://${sendTo}/check_login`,
          { message },
          { withCredentials: true }
        )
        .then(res => {
          if (res.data.isLoginSuccessful) {
            if (!res.data.isGuest) {
              dispatch(loginStatusCreator(res.data.isLoginSuccessful));
              if (userState.nickname === undefined) {
                dispatch(userStateCreator(res.data));
                dispatch(comparisonStateCreator(''));
              } else if (userState.stores.game.steam !== res.data.stores.game.steam) {
                dispatch(userStateCreator(res.data));
              }
            } else {
              dispatch(loginStatusCreator(res.data.isLoginSuccessful));
              if (userState.nickname === undefined) {
                dispatch(userStateCreator(res.data));
                dispatch(comparisonStateCreator(''));
              } else if (userState.stores.game.steam !== res.data.stores.game.steam) {
                dispatch(userStateCreator(res.data));
              }
            }
          } else if (res.data === 'session_expired' || res.data === 'check_failed') {
            (() =>
              new Promise(resolve => {
                localStorage.removeItem('frog');
                localStorage.removeItem('flies');
                if (!localStorage.getItem('frog')) {
                  resolve(true);
                }
              }).then(res => {
                if (res) {
                  alert('로그인이 필요합니다');
                  history.push('/');
                }
              }))();
          } else if (res.data === 'no_sessions') {
            alert('로그인이 필요합니다');
            history.push('/');
          }
        })
        .catch(err => console.log(err));
    };
    if (comparisonState !== '') {
      checkLogin();
    }
    checkLogin();
    // return () => {
    //   abortCon.abort();
    // }
  }, [comparisonState]);

  useEffect(() => {
    const abortCon = new AbortController();
    const { stores } = userState;
    if (stores !== undefined) {
      const categories = Object.keys(stores);
      const eachStoresOfCategories = categories.map(ele => Object.keys(stores[ele]));
      const eachStatusOfStoresOfCategories = categories.map(ele => Object.values(stores[ele]));
      const activatedStores = eachStatusOfStoresOfCategories.map(storeStat =>
        storeStat.map((ele, index) => (ele === true ? index : '')).filter(ele => ele !== '')
      );
      const storesToDisplay = activatedStores.map((status, index) =>
        status.map(iTrue => eachStoresOfCategories[index][iTrue])
      );
      // setStoresList(storesToDisplay);
      const testObj = {};
      categories.forEach((category, index) => {
        if (storesToDisplay[index] !== undefined) {
          testObj[category] = storesToDisplay[index];
        } else {
          testObj[category] = 'foo';
        }
      });
      setStoresList(testObj);
    }
    return () => {
      abortCon.abort();
    };
  }, [userState.stores]);

  useEffect(() => {
    const abortCon = new AbortController();
    const dataToSend = {
      reqUser: userState.nickname,
      // 임시로 작업 - 모든 카테고리 및 모든 스토어에 대응할 수 있도록 수정 필요
      reqLibs: storesList.game
    };
    if (dataToSend.reqLibs !== '') {
      axios
        // .post('http://localhost:3001/get/db', { reqData: dataToSend }, { withCredentials: true })
        .post(`https://${sendTo}/get/db`, { reqData: dataToSend }, { withCredentials: true })
        .then(res => {
          // 임시로 작업 - 모든 카테고리 및 모든 스토어에 대응할 수 있도록 수정 필요
          if (res.data !== 'no_result') {
            setUserLibrary({ steam: res.data });
          }
        });
      // .catch(err => alert(err));
    }
    return () => {
      abortCon.abort();
    };
  }, [storesList]);

  useEffect(() => {
    const abortCon = new AbortController();
    if (selectedItemData.name) {
      if (selectedItem !== selectedItemData.name) {
        dispatch(modalStateCreator(true));
      } else {
        dispatch(modalStateCreator(false));
      }
    } else if (selectedItem) {
      dispatch(modalStateCreator(true));
    }
    return () => {
      abortCon.abort();
    };
  }, [selectedItem, selectedItemData]);

  if (loginStatus === false && logoutClicked === false) {
    return <></>;
  }

  return (
    <>
      <main
        id="main"
        css={css`
          ${sizes.free('100%', '100vh')}
          ${flex.vertical}
          pointer-events: ${modalState && modalOrigin === 'Library' ? 'none' : 'auto'};
          z-index: 1;
          position: relative;
          overflow: hidden;

          // #header button, #library button {
          //   padding: 5px;
          //   cursor: pointer;

          //   :hover {
          //     -webkit-filter: brightness(90%);
          //             filter: brightness(90%);
          //   }
          
          //   :active {
          //     -webkit-transform: scale(0.95);
          //         -ms-transform: scale(0.95);
          //             transform: scale(0.95);
          //   }
          // }
        `}
        onClick={e => {
          // e.preventDefault();
          if (balloonState !== 'none' && Array.from(e.target.className).slice(0, 7).join('') !== 'balloon') {
            dispatch(balloonStateCreator('none'));
          }
        }}
      >
        <Header headerRef={headerRef} setHeight={setHeaderHeight} />
        <div
          id="main-contents"
          css={css`
            ${sizes.free('100%', `calc(100% - ${headerHeight}px)`)}
            ${flex.horizontal}
          `}
        >
          <Navigation storesList={storesList} />
          <Library userLib={userLibrary} />
          <Meta />
        </div>
      </main>
      <Modal
        style={modalOption(modalOrigin)}
        contents={() =>
          modalContents(
            userState,
            dispatch,
            comparisonStateCreator,
            modalStateCreator,
            modalOrigin,
            setUserLibrary,
            selectedItemDataCreator,
            selectedMediaId,
            selectedMediaIdCreator,
            selectedMediaList
          )
        }
        origin={modalOrigin}
      />
    </>
  );
};

export default Main;
