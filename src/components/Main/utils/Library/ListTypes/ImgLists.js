import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../../custom_modules/address';

const ImgLists = ({ props, filter }) => {
  const { funcs, actions, styles, states } = props;
  const {
    location,
    dispatch,
    axios
  } = funcs;
  const {
    modalOriginCreator,
    selectedItemCreator,
    extCredStateCreator,
    selectedItemDataCreator
  } = actions;
  const {
    makeListStyle,
    flex
  } = styles;
  const {
    userLib,
    libDisplay,
    coverSize,
    extCredState,
    userState
  } = states;
  const { steam } = userLib;
  const { isFiltered, word } = filter;
  if (location.pathname === '/offline' || !navigator.onLine) {
    const result = (
      steam.sort((prev, next) => prev.titles < next.titles ? -1 : 1).map((item, idx) => (
        <li
        key={`img-${idx}`}
        css={css`${makeListStyle({ flex }, { libDisplay, coverSize })}`}
      >
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.covers}.png`}
          title={`${item.titles}`}
          alt={`${item.titles}-cover`}
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
            dispatch(selectedItemCreator(item.titles));
            dispatch(selectedItemDataCreator(JSON.parse(item.metas)));
          }}
        />
      </li>
      ))
    );
    if (isFiltered) {
      return result.filter(ele => ele.props.children.props.title.match(word));
    }
    return result;
  }

  const result = (
    steam.map((item, index) => (
      <li
        key={`img-${index}`}
        css={css`${makeListStyle({ flex }, { libDisplay, coverSize })}`}
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
                  // 'http://localhost:3003/api/connect',
                  `https://${sendTo}/api/connect`,
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
                      // 'http://localhost:3003/get/meta',
                      `https://${sendTo}/get/meta`,
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
                  // 'http://localhost:3003/get/meta',
                  `https://${sendTo}/get/meta`,
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
    ))
  );
  if (isFiltered) {
    return result.filter(ele => ele.props.children.props.title.match(word));
  }
  return result;
};

export default ImgLists;