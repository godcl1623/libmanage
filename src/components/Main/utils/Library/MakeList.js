/* eslint-disable no-else-return */
import React, { Suspense, memo } from 'react';
import axios from 'axios';
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
    modalOriginCreator,
    location
  } = args;

  if (userLib !== '') {
    const funcs = {location, dispatch, axios};
    const actions = {modalOriginCreator, selectedItemCreator, extCredStateCreator, selectedItemDataCreator};
    const styles = {makeListStyle, flex};
    const states = {userLib, libDisplay, coverSize, extCredState, userState};

    if (selectedCategory === 'all' || selectedCategory === 'game') {
      if (selectedStores.includes('all') || selectedStores.includes('steam')) {
        if (libDisplay === 'list') {
          if (librarySearch === '') {
            return (
              <Suspense fallback={fallBack()}>
                <MemoedText props={{funcs, actions, styles, states}} filter={{isFiltered: false}} />
              </Suspense>
            );
          } else {
            const word = new RegExp(librarySearch, 'gi');
            return (
              <Suspense fallback={fallBack()}>
                <MemoedText props={{funcs, actions, styles, states}} filter={{isFiltered: true, word}} />
              </Suspense>
            );
          }
        } else if (libDisplay === 'cover') {
          if (librarySearch === '') {
            return (
              <Suspense fallback={fallBack()}>
                <MemoedImg props={{funcs, actions, styles, states}} filter={{isFiltered: false}} />
              </Suspense>
            );
          } else {
            const word = new RegExp(librarySearch, 'gi');
            return (
              <Suspense fallback={fallBack()}>
                <MemoedImg props={{funcs, actions, styles, states}} filter={{isFiltered: true, word}} />
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
  } else {
    return <></>
  }
}

export default MakeList;