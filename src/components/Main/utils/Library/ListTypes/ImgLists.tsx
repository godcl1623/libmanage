import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../../custom_modules/address';

// props 타입 변경 필요
const ImgLists = ({ props, filter }: any) => {
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
      // prev, next, item 타입 변경 필요
      steam.sort((prev: any, next: any) => prev.titles < next.titles ? -1 : 1).map((item: any, idx: number) => (
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
            e.currentTarget.style.filter = 'brightness(0.75)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.filter = 'brightness(1)';
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
      // ele 타입 변경 필요
      return result.filter((ele: any) => ele.props.children.props.title.match(word));
    }
    return result;
  }

  const result = (
    // item 타입 변경 필요
    steam.map((item: any, index: number) => (
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
            e.currentTarget.style.filter = 'brightness(0.75)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.filter = 'brightness(1)';
          }}
          onClick={e => {
            dispatch(modalOriginCreator('Library'));
            dispatch(selectedItemCreator(e.currentTarget.title));
            if (extCredState.cid === undefined) {
              axios
                .post(
                  // 'http://localhost:3003/api/connect',
                  `https://${sendTo}/api/connect`,
                  { execute: 'order66' },
                  { withCredentials: true }
                )
                // res 타입 변경 필요
                .then((res: any) => {
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
                    // res 타입 변경 필요
                    .then((res: any) => {
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
                // res 타입 변경 필요
                .then((res: any) => {
                  dispatch(selectedItemDataCreator(res.data));
                });
            }
          }}
        />
      </li>
    ))
  );
  if (isFiltered) {
    // ele 타입 변경 필요
    return result.filter((ele: any) => ele.props.children.props.title.match(word));
  }
  return result;
};

export default ImgLists;