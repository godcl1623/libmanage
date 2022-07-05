import { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flex, sizes } from '../../../../styles';
import { selStoresListStyle } from '../../styles/MainStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';

const SelectedStoresList = ({ listRef, setHeight, selStores, funcs }: any) => {
  const { dispatch, selectedStoresCreator, selectedItemCreator, selectedItemDataCreator } = funcs;

  useEffect(() => {
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
      css={css`${selStoresListStyle({ flex, sizes } as StyleSet)}`}
    >
      {
        selStores[0] === ''
          ?
            ''
          :
            selStores.map((store: string) => 
              <button
                key={`${store}-button`}
                onClick={e => {
                  e.preventDefault();
                  dispatch(selectedStoresCreator((e.target as HTMLButtonElement).innerText.split(' ')[0]));
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