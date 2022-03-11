import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../../custom_modules/address';

const TextLists = ({props, filter}) => {
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
  const { isFiltered, word } = filter;
  const { steam } = userLib;
  if (location.pathname === '/offline' || !navigator.onLine) {
    const result = (
      steam.sort((prev, next) => prev.titles < next.titles ? -1 : 1).map((item, idx) => (
        <li
          key={`lib-item-${idx}`}
          css={css`${makeListStyle({ flex }, { libDisplay, coverSize })}`}
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
            dispatch(selectedItemCreator(item.titles));
            dispatch(selectedItemDataCreator(JSON.parse(item.metas)));
          }}
        >
          {item.titles}
        </li>
      ))
    );
    if (isFiltered) {
      return result.filter(ele => ele.props.children.match(word));
    }
    return result;
  }

  const result = (
    steam.map((item, index) => (
      <li
        key={`lib-item-${index}`}
        css={css`${makeListStyle({ flex }, { libDisplay, coverSize })}`}
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
              // .post('http://localhost:3003/get/meta', { reqData }, { withCredentials: true })
              .post(`https://${sendTo}/get/meta`, { reqData }, { withCredentials: true })
              .then(res => {
                dispatch(selectedItemDataCreator(res.data));
              });
          }
        }}
      >
        {item.title}
      </li>
    ))
  );

  if (isFiltered) {
    return result.filter(ele => ele.props.children.match(word));
  }
  return result;
};

export default TextLists;