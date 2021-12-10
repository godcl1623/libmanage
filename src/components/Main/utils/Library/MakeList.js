/* eslint-disable no-else-return */
import React from 'react';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../custom_modules/address';
import { flex } from '../../../../styles';

const MakeList = ({ args }) => {
  const {
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
  } = args;

  if (userLib !== '') {
    if (selectedCategory === 'all' || selectedCategory === 'game') {
      if (selectedStores.includes('all') || selectedStores.includes('steam')) {
        const { steam } = userLib;
        if (libDisplay === 'list') {
          const result = steam.map((item, index) => (
            <li
              key={index}
              css={css`
                padding: calc(var(--gap-multiply-small) * 2) calc(var(--gap-multiply-small) * 6);
                font-size: var(--font-size-normal);
                cursor: pointer;
                background: white;

                @media (orientation: portrait) {
                  @media (max-width: 599px) {
                    padding: calc(var(--gap-multiply-small) * 1.2) calc(var(--gap-multiply-small) * 3);
                    width: 100%;
                    font-size: 16px;
                  }
                }
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
                dispatch(selectedItemCreator(e.target.innerText));
                if (extCredState.cid === undefined) {
                  axios
                    .post(
                      'http://localhost:3001/api/connect',
                      // `https://${sendTo}/api/connect`,
                      { execute: 'order66' },
                      { withCredentials: true }
                    )
                    .then(res => {
                      dispatch(extCredStateCreator(res.data));
                      const reqData = {
                        reqUser: userState.nickname,
                        selTitle: item.title,
                        credData: res.data
                      };
                      axios
                        .post(
                          'http://localhost:3001/get/meta',
                          // `https://${sendTo}/get/meta`,
                          { reqData },
                          { withCredentials: true }
                        )
                        .then(res => {
                          dispatch(selectedItemDataCreator(res.data));
                        });
                    });
                } else {
                  const reqData = {
                    reqUser: userState.nickname,
                    selTitle: item.title,
                    credData: extCredState
                  };
                  axios
                    .post('http://localhost:3001/get/meta', { reqData }, { withCredentials: true })
                    // .post(`https://${sendTo}/get/meta`, { reqData }, { withCredentials: true })
                    .then(res => {
                      dispatch(selectedItemDataCreator(res.data));
                    });
                }
              }}
            >
              {item.title}
            </li>
          ));
          if (librarySearch === '') {
            return result;
          } else {
            const word = new RegExp(librarySearch, 'gi');
            return result.filter(ele => ele.props.children.match(word));
          }
        } else if (libDisplay === 'cover') {
          const result = steam.map((item, index) => (
            <li
              key={`img-${index}`}
              css={css`
                margin: calc(var(--gap-multiply-small) * 2);
                height: ${coverSize}vw;
                flex: 0 0 10%;
                ${flex.horizontal}
                cursor: pointer;

                :active {
                  -webkit-transform: scale(0.95);
                      -ms-transform: scale(0.95);
                          transform: scale(0.95);
                }

                @media (orientation: portrait) and (max-width: 599px) {
                  margin: 10px;
                  height: ${coverSize * 2}vh;
                  flex: 0 0 10%;
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
                  dispatch(selectedItemCreator(e.target.title));
                  if (extCredState.cid === undefined) {
                    axios
                      .post(
                        'http://localhost:3001/api/connect',
                        // `https://${sendTo}/api/connect`,
                        { execute: 'order66' },
                        { withCredentials: true }
                      )
                      .then(res => {
                        dispatch(extCredStateCreator(res.data));
                        const reqData = {
                          reqUser: userState.nickname,
                          selTitle: item.title,
                          credData: res.data
                        };
                        axios
                          .post(
                            'http://localhost:3001/get/meta',
                            // `https://${sendTo}/get/meta`,
                            { reqData },
                            { withCredentials: true }
                          )
                          .then(res => {
                            dispatch(selectedItemDataCreator(res.data));
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
                        'http://localhost:3001/get/meta',
                        // `https://${sendTo}/get/meta`,
                        { reqData },
                        { withCredentials: true }
                      )
                      .then(res => {
                        dispatch(selectedItemDataCreator(res.data));
                      });
                  }
                }}
              />
            </li>
          ));
          if (librarySearch === '') {
            return result;
          } else {
            const word = new RegExp(librarySearch, 'gi');
            return result.filter(ele => ele.props.children.props.title.match(word));
          }
        }
      } else {
        return <></>
      }
    }
  } else {
    return <></>
  }
}

export default MakeList;