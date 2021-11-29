import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flex, sizes } from '../../../../styles';

const SelectedStoresList = ({ selStores, funcs }) => {
  const { dispatch, selectedStoresCreator, selectedItemCreator, selectedItemDataCreator } = funcs;
  return (
    <ul
      css={css`
        border-bottom: 1px solid black;
        height: 50px;
        ${flex.horizontal}
        background: white;
        ${sizes.free('100%', '50px')}

        button {
          padding: 2px 10px;
          background: red;
          color: white;
          font-size: 12px;
        }

        button:after {
          content: '×';
          margin-left: 10px;
          color: white;
        }
      `}
    >
      {
        selStores[0] === ''
          ?
            ''
          :
            selStores.map(store => 
              <button
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