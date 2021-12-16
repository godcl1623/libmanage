import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Header from '../../Header';
import Library from '../../Library';
import Meta from '../../Meta';
import Navigation from '../../Navigation';
import Modal from '../../../Modal/Modal';
import ModalContents from './ModalContents';
import SelectedStoresList from './SelectedStoresList';
import modalOption from '../../styles/modals/MainModalStyles';

const MainContents = ({ props }) => {
  const { states, setStates, actionCreators, refs, moduleHooks, styles } = props;
  const {
    balloonState,
    userState,
    selectedItemData,
    modalOrigin,
    modalState,
    selectedMediaId,
    selectedMediaList,
    isMobile,
    selectedStores,
    storesList,
    userLibrary,
    headerHeight,
    selStoresListHeight,
    isPortrait,
    coverSize
  } = states;
  const {
    setUserLibrary,
    setHeaderHeight,
    setSelStoresListHeight,
    setCoverSize
  } = setStates;
  const {
    balloonStateCreator,
    comparisonStateCreator,
    modalStateCreator,
    selectedItemCreator,
    selectedItemDataCreator,
    selectedMediaIdCreator,
    selectedStoresCreator
  } = actionCreators;
  const { headerRef, listRef } = refs;
  const { dispatch } = moduleHooks;
  const { mainStyle, flex, sizes } = styles;

  return (
    <>
      <main
        id="main"
        css={css`
          ${mainStyle({ flex, sizes }, { modalState, modalOrigin, headerHeight })}
        `}
        onClick={e => {
          // e.preventDefault();
          if (!isMobile) {
            if (
              balloonState !== 'none' &&
              Array.from(e.target.className).slice(0, 7).join('') !== 'balloon'
            ) {
              dispatch(balloonStateCreator('none'));
            }
          } else if (
            balloonState !== 'none' &&
            Array.from(e.target.className).slice(0, 7).join('') !== 'balloon' &&
            e.target.name !== 'libraryFilter' &&
            e.target.name !== 'delete-input'
          ) {
            dispatch(balloonStateCreator('none'));
          }
        }}
      >
        <Header headerRef={headerRef} setHeight={setHeaderHeight} currHeight={headerHeight} />
        <div id="main-contents">
          {isPortrait && isMobile ? (
            <SelectedStoresList
              listRef={listRef}
              setHeight={setSelStoresListHeight}
              selStores={selectedStores}
              funcs={{
                dispatch,
                selectedStoresCreator,
                selectedItemCreator,
                selectedItemDataCreator
              }}
            />
          ) : (
            ''
          )}
          {!isPortrait ? (
            <>
              <Navigation storesList={storesList} />
              <Library userLib={userLibrary} coverSize={coverSize} setCoverSize={setCoverSize} />
              <Meta portrait={isPortrait} heights={{ headerHeight, selStoresListHeight }} />
            </>
          ) : isMobile ? (
            <>
              {selectedStores[0] === '' ? (
                <Navigation storesList={storesList} />
              ) : selectedItemData.name === undefined ? (
                <Library userLib={userLibrary} coverSize={coverSize} setCoverSize={setCoverSize} />
              ) : (
                <Meta portrait={isPortrait} heights={{ headerHeight, selStoresListHeight }} />
              )}
            </>
          ) : (
            <>
              <Navigation storesList={storesList} />
              {selectedItemData.name === undefined ? (
                <Library userLib={userLibrary} coverSize={coverSize} setCoverSize={setCoverSize} />
              ) : (
                <Meta portrait={isPortrait} heights={{ headerHeight, selStoresListHeight }} />
              )}
            </>
          )}
        </div>
      </main>
      <Modal
        style={modalOption(modalOrigin, isMobile, isPortrait, flex)}
        contents={
          <ModalContents
            args={{
              userState,
              dispatch,
              comparisonStateCreator,
              modalStateCreator,
              modalOrigin,
              setUserLibrary,
              selectedItemDataCreator,
              selectedMediaId,
              selectedMediaIdCreator,
              selectedMediaList
            }}
          />
        }
        origin={modalOrigin}
      />
    </>
  );
};

export default MainContents;
