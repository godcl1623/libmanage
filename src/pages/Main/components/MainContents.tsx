/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Header from './Header';
import Navigation from './Navigation';
import Library from './Library';
import Meta from './Meta';
import Modal from '../../../components/Modal/Modal';
import ModalContents from './ModalContents';
import SelectedStoresList from './mobiles/SelectedStoresList/SelectedStoresList';
import modalOption from '../styles/modals/MainModalStyles';

const MainContents = ({ props }: any) => {
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
    setCoverSize,
    setStoresList
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
          if (!isMobile) {
            if (
              balloonState !== 'none' &&
              Array.from((e.target as HTMLElement).className).slice(0, 7).join('') !== 'balloon'
            ) {
              dispatch(balloonStateCreator('none'));
            }
          } else if (
            balloonState !== 'none' &&
            Array.from((e.target as HTMLElement).className).slice(0, 7).join('') !== 'balloon' &&
            (e.target as any).name !== 'libraryFilter' &&
            (e.target as any).name !== 'delete-input'
          ) {
            dispatch(balloonStateCreator('none'));
          }
        }}
      >
        <Header
          headerRef={headerRef}
          setHeight={setHeaderHeight}
          currHeight={headerHeight}
        />
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
              selectedMediaList,
              setStoresList
            }}
          />
        }
        origin={modalOrigin}
      />
    </>
  );
};

export default MainContents;
