import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../../custom_modules/address';

// propt 타입 수정 필요
const TextLists = ({ props, filter, windIdx }: any) => {
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
  if (location.pathname === '/offline' || !navigator.onLine) {
    const result = (
      // prev, next, item 타입 수정 필요
      steam.sort((prev: any, next: any) => prev.titles < next.titles ? -1 : 1).map((item: any, idx: number) => (
        <li
          key={`lib-item-${idx}`}
          css={css`${makeListStyle({ flex }, { libDisplay, coverSize })}`}
          // currentTarget 작동 여부 확인 필요
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--highlight-light)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'white';
          }}
          onMouseDown={e => {
            e.currentTarget.style.background = 'var(--btn-active)';
          }}
          onMouseUp={e => {
            e.currentTarget.style.background = 'var(--highlight-light)';
          }}
          onClick={e => {
            dispatch(modalOriginCreator('Library'));
            dispatch(selectedItemCreator(item.titles));
            dispatch(selectedItemDataCreator(JSON.parse(item.metas)));
          }}
        >
          {item.titles}
        </li>
      ))
    );
    // ele 타입 수정 필요
    return result.filter((ele: any) => ele.props.children.match(filter));
  }

  const result = (
    // item 타입 수정 필요
    steam.map((item: any, index: number) => (
      <li
        key={`lib-item-${index}`}
        css={css`${makeListStyle({ flex }, { libDisplay, coverSize })}`}
        // currentTarget 작동 여부 확인 필요
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--highlight-light)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'white';
        }}
        onMouseDown={e => {
          e.currentTarget.style.background = 'var(--btn-active)';
        }}
        onMouseUp={e => {
          e.currentTarget.style.background = 'var(--highlight-light)';
        }}
        onClick={e => {
          dispatch(modalOriginCreator('Library'));
          dispatch(selectedItemCreator(e.currentTarget.innerText));
          if (extCredState.cid === undefined) {
            axios
              .post(
                'http://localhost:3003/api/connect',
                // `https://${sendTo}/api/connect`,
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
                    'http://localhost:3003/get/meta',
                    // `https://${sendTo}/get/meta`,
                    { reqData },
                    { withCredentials: true }
                  )
                  // res 타입 수정 필요
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
              .post('http://localhost:3003/get/meta', { reqData }, { withCredentials: true })
              // .post(`https://${sendTo}/get/meta`, { reqData }, { withCredentials: true })
              // res 타입 수정 필요
              .then((res: any) => {
                dispatch(selectedItemDataCreator(res.data));
              });
          }
        }}
      >
        {item.title}
      </li>
    ))
  );

  // ele 타입 수정 필요
  return result.filter((ele: any) => ele.props.children.match(filter))[windIdx];
};

export default TextLists;