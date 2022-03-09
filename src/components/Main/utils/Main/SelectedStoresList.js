import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flex, sizes } from '../../../../styles';
import { selStoresListStyle } from '../../styles/MainStyles';

const SelectedStoresList = ({ listRef, setHeight, selStores, funcs }) => {
  const { dispatch, selectedStoresCreator, selectedItemCreator, selectedItemDataCreator } = funcs;

  React.useEffect(() => {
    const detector = () => {
      if (window.matchMedia('(orientation: portrait)').matches) {
        setHeight(listRef.current.getBoundingClientRect().height);
      } else {
        setHeight(listRef.current.getBoundingClientRect().height);
      }
    };
    detector();
    window.addEventListener('resize', detector);
    return () => window.removeEventListener('resize', detector);
  }, []);

  return (
    <ul
      ref={listRef}
      css={css`${selStoresListStyle({ flex, sizes })}`}
    >
      {
        selStores[0] === ''
          ?
            ''
          :
            selStores.map(store => 
              <button
                key={`${store}-button`}
                onClick={e => {
                  e.preventDefault();
                  dispatch(selectedStoresCreator(e.target.innerText.split(' ')[0]));
                  dispatch(selectedItemCreator(''));
                  dispatch(selectedItemDataCreator({}));
                }}
              >
                {store}
              </button>
            )
      }
    </ul>
  )
};

export default SelectedStoresList;