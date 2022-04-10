/* eslint-disable no-else-return */
import React, { Suspense, memo } from 'react';
import axios from 'axios';
import { FixedSizeList as List, FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { flex } from '../../../../styles';
import { makeListStyle } from '../../styles/LibraryStyles';

const TextLists = React.lazy(() => import('./ListTypes/TextLists'));
const ImgLists = React.lazy(() => import('./ListTypes/ImgLists'));

const MemoedText = memo(TextLists);
const MemoedImg = memo(ImgLists);

const fallBack = () => (
  <h1
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    Loading
  </h1>
);

// 타입 수정 필요
const MakeList = ({ args }: any) => {
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
    modalOriginCreator,
    location
  } = args;

  if (userLib !== '') {
    const funcs = {location, dispatch, axios};
    const actions = {modalOriginCreator, selectedItemCreator, extCredStateCreator, selectedItemDataCreator};
    const styles = {makeListStyle, flex};
    const states = {userLib, libDisplay, coverSize, extCredState, userState};
    const listChild = function({ index, style }: any) {
      return (
        <div
          style={{
            ...style,
            height: '10vw'
          }}
        >
          <ImgLists
            props={{funcs, actions, styles, states}}
            filter={{isFiltered: false}}
            index={index}
          />
        </div>
      );
    }

    if (selectedCategory === 'all' || selectedCategory === 'game') {
      if (selectedStores.includes('all') || selectedStores.includes('steam')) {
        if (libDisplay === 'list') {
          if (librarySearch === '') {
            return (
              <Suspense fallback={fallBack()}>
                <TextLists props={{funcs, actions, styles, states}} filter={{isFiltered: false}} />
              </Suspense>
            );
          } else {
            const word = new RegExp(librarySearch, 'gi');
            return (
              <Suspense fallback={fallBack()}>
                <TextLists props={{funcs, actions, styles, states}} filter={{isFiltered: true, word}} />
              </Suspense>
            );
          }
        } else if (libDisplay === 'cover') {
          if (librarySearch === '') {
            return (
              <Suspense fallback={fallBack()}>
                {/* <List
                  width={'100%'}
                  height={800}
                  itemCount={userLib.steam.length}
                  itemSize={192}
                >
                  { listChild }
                </List> */}
                <AutoSizer>
                  {({ width, height }) => {
                    const foo = 'bar';
                  }}
                </AutoSizer>
              </Suspense>
            );
          } else {
            const word = new RegExp(librarySearch, 'gi');
            return (
              <Suspense fallback={fallBack()}>
                <ImgLists props={{funcs, actions, styles, states}} filter={{isFiltered: true, word}} />
              </Suspense>
            );
          }
        }
      } else {
        return <></>
      }
    } else {
      return <></>
    }
  }
  return <></>
}

export default MakeList;