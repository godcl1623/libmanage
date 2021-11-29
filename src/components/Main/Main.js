/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineCloseCircle, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
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
  selectedItemCreator,
  selectedItemDataCreator,
  selectedMediaIdCreator,
  isMobileCreator,
  selectedStoresCreator
} from '../../actions';
import { sendTo } from '../../custom_modules/address';
import { sizes, flex, border } from '../../styles';
import signin from '../../assets/sits_large_noborder.png';
import SelectedStoresList from './utils/Main/SelectedStoresList';

const modalOption = origin => `
  position: absolute;
  width: ${
    origin !== 'Header_MemInfo' ? (origin.split('-')[0] === 'meta' ? '90vw' : '50%') : '45%'
  };
  height: ${
    origin !== 'Header_MemInfo'
      ? origin.split('-')[0] === 'meta'
        ? `${(90 * 9) / 16}vw`
        : 'max-content'
      : 'max-content'
  };
  ${flex.vertical}
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

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
            padding: calc(var(--gap-standard) * 2) var(--gap-standard);
            ${sizes.full}
            ${flex.vertical}
            align-items: flex-start;
            position: relative;

            h1 {
              margin-left: calc(var(--gap-standard) * 2);
              margin-bottom: calc(var(--gap-standard) / 2);
              font-size: calc(var(--font-size-normal) * 2);
            }

            h2,
            button {
              font-size: 1.563vw;
            }

            hr {
              margin-bottom: calc(var(--gap-standard) * 2);
              ${sizes.free('100%')};
            }

            p {
              bottom: 1.563vw;
              font-size: var(--font-size-standard);
              width: 100%;
              text-align: center;
            }

            .store_container {
              margin-bottom: 5.208vw;
              padding: 0 4.167vw;
              padding-bottom: calc(var(--gap-standard) / 2);
              ${flex.horizontal}
              ${sizes.free('100%')};
              justify-content: space-between;

              button {
                padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
              }
            }

            @media (orientation: portrait) {
              h2,
              button {
                font-size: ${1.563 * 1.778}vw;
              }

              p {
                bottom: ${1.563 * 1.778}vw;
              }

              .store_container {
                padding: 0 ${4.167 * 1.778}vw;
              }
            }
          `}
        >
          <h1>스토어 목록</h1>
          <hr />
          <section className="store_container">
            <h2>Steam</h2>
            <a
              // href="http://localhost:3001/auth/steam"
              href={`https://${sendTo}/auth/steam`}
            >
              <img src={signin} alt="sign_in_through_steam" title="sign_in_through_steam" />
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
            padding: var(--gap-standard) calc(var(--gap-standard) / 2);
            ${sizes.full}
            ${flex.vertical}
            align-items: flex-start;
            position: relative;
            background: white;

            h1 {
              margin-left: calc(var(--gap-standard) * 2);
              margin-bottom: calc(var(--gap-standard) / 2);
              font-size: calc(var(--font-size-normal) * 2);
            }

            h2,
            button {
              font-size: 1.563vw;
            }

            hr {
              margin-bottom: calc(var(--gap-standard) * 2);
              ${sizes.free('100%')};
            }

            p {
              bottom: 1.563vw;
              font-size: var(--font-size-standard);
              width: 100%;
              text-align: center;
            }

            .store_container {
              margin-bottom: 5.208vw;
              padding: 0 4.167vw;
              padding-bottom: calc(var(--gap-standard) / 2);
              ${flex.horizontal}
              ${sizes.free('100%')};
              justify-content: space-between;

              button {
                padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 3);
                background: var(--btn-alert);
                color: var(--white);
              }
            }

            @media (orientation: portrait) {
              h2,
              button {
                font-size: ${1.563 * 1.778}vw;
              }

              p {
                bottom: ${1.563 * 1.778}vw;
              }

              .store_container {
                margin-bottom: ${5.208 * 1.778}vw;
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
            {selMedia ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selMedia}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              ''
            )}
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
            {selMedia ? (
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_original/${selMedia}.jpg`}
                alt="media"
                id={`img-${selMedia}`}
                css={css`
                  ${sizes.full}
                  color: white;
                `}
              />
            ) : (
              ''
            )}
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
        margin: 10.417vw;
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
  const isMobile = useSelector(state => state.isMobile);
  const selectedStores = useSelector(state => state.selectedStores);
  const [storesList, setStoresList] = useState('');
  const [userLibrary, setUserLibrary] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const [coverSize, setCoverSize] = React.useState(10);
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

  useEffect(() => {
    const detector = () => {
      if (window.matchMedia('(orientation: portrait)').matches) {
        setIsPortrait(true);
        if (window.innerWidth < 600) {
          dispatch(isMobileCreator(true));
          // dispatch(selectedStoresCreator(''));
        }
      } else {
        setIsPortrait(false);
        dispatch(isMobileCreator(false));
        dispatch(selectedStoresCreator('all'));
      }
    };
    window.addEventListener('resize', detector);
    return () => window.removeEventListener('resize', detector);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(orientation: portrait)').matches) {
      setIsPortrait(true);
      if (window.innerWidth < 600) {
        dispatch(isMobileCreator(true));
        dispatch(selectedStoresCreator(''));
      }
    } else {
      setIsPortrait(false);
      dispatch(isMobileCreator(false));
    }
  }, []);

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
        `}
        onClick={e => {
          // e.preventDefault();
          if (!isMobile) {
            if (
              balloonState !== 'none' &&
              Array.from(e.target.className).slice(0, 7).join('') !== 'balloon'
            ) {
              dispatch(balloonStateCreator('none'));
            }
          } else if (
            balloonState !== 'none' &&
            Array.from(e.target.className).slice(0, 7).join('') !== 'balloon' &&
            e.target.name !== 'libraryFilter' &&
            e.target.name !== 'delete-input'
          ) {
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

            @media (orientation: portrait) and (max-width: 599px) {
              ${flex.vertical}
            }
          `}
        >
          {isPortrait && isMobile ? (
            <SelectedStoresList
              selStores={selectedStores}
              funcs={{
                dispatch,
                selectedStoresCreator,
                selectedItemCreator,
                selectedItemDataCreator
              }}
            />
          ) : (
            ''
          )}
          {!isPortrait ? (
            <>
              <Navigation storesList={storesList} />
              <Library userLib={userLibrary} />
              <Meta />
            </>
          ) : isMobile ? (
            <>
              {selectedStores[0] === '' ? (
                <Navigation storesList={storesList} />
              ) : selectedItemData.name === undefined ? (
                <Library userLib={userLibrary} coverSize={coverSize} setCoverSize={setCoverSize} />
              ) : (
                <Meta />
              )}
            </>
          ) : (
            <>
              <Navigation storesList={storesList} />
              {selectedItemData.name === undefined ? (
                <Library userLib={userLibrary} coverSize={coverSize} setCoverSize={setCoverSize} />
              ) : (
                <Meta />
              )}
            </>
          )}
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
