/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../../custom_modules/address';

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
      steam.sort((prev: any, next: any) => prev.titles < next.titles ? -1 : 1).map((item: any, idx: number) => (
        <li
          key={`lib-item-${idx}`}
          css={css`${makeListStyle({ flex }, { libDisplay, coverSize })}`}
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
    return result.filter((ele: any) => ele.props.children.match(filter));
  }

  const result = (
    steam.map((item: any, index: number) => (
      <li
        key={`lib-item-${index}`}
        css={css`${makeListStyle({ flex }, { libDisplay, coverSize })}`}
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
                `https://${sendTo}/api/connect`,
                { execute: 'order66' },
                { withCredentials: true }
              )
              .then((res: any) => {
                dispatch(extCredStateCreator(res.data));
                const reqData = {
                  reqUser: userState.nickname,
                  selTitle: item.title,
                  credData: res.data
                };
                axios
                  .post(
                    `https://${sendTo}/get/meta`,
                    { reqData },
                    { withCredentials: true }
                  )
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
              .post(`https://${sendTo}/get/meta`, { reqData }, { withCredentials: true })
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

  return result.filter((ele: any) => ele.props.children.match(filter))[windIdx];
};

export default TextLists;