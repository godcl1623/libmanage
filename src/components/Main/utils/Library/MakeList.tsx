/* eslint-disable no-else-return */
import { Suspense, lazy } from 'react';
import axios from 'axios';
import { FixedSizeList as List, FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { flex } from '../../../../styles';
import { makeListStyle } from '../../styles/LibraryStyles';

const TextLists = lazy(() => import('./ListTypes/TextLists'));
const ImgLists = lazy(() => import('./ListTypes/ImgLists'));

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
    location,
    ulRef
  } = args;

  if (userLib !== '') {
    const funcs = {location, dispatch, axios};
    const actions = {modalOriginCreator, selectedItemCreator, extCredStateCreator, selectedItemDataCreator};
    const styles = {makeListStyle, flex};
    const states = {userLib, libDisplay, coverSize, extCredState, userState};
    const gap = 15;
    const colCount = ulRef.current ? Math.floor(ulRef.current.clientWidth / ((coverSize * 19.2 * 0.75) + gap)) : 0;
    const word = new RegExp(librarySearch, 'gi');
    const itemList = userLib.steam.filter((game: any) => game.title.match(word));
    const gridChild = function({ columnIndex, rowIndex, style }: any) {
      return (
        <div
          style={{
            ...style,
            left: style.left + gap,
            top: style.top + gap,
            width: style.width - gap,
            height: style.height - gap
          }}
        >
          <ImgLists
            props={{funcs, actions, styles, states, colCount}}
            filter={word}
            colIndex={columnIndex}
            rowIndex={rowIndex}
          />
        </div>
      );
    }
    const listChild = function({ index, style }: any) {
      return (
        <div
          style={style}
        >
          <TextLists
            props={{funcs, actions, styles, states}}
            filter={word}
            windIdx={index}
          />
        </div>
      );
    }

    if (selectedCategory === 'all' || selectedCategory === 'game') {
      if (selectedStores.includes('all') || selectedStores.includes('steam')) {
        if (libDisplay === 'list') {
          const itemSize =
            window.innerWidth > 1600
              ? 45
              : window.innerWidth > 1400
                ? 40
                : window.innerWidth > 1200
                  ? 35
                  : 30
          return (
            <Suspense fallback={fallBack()}>
              <AutoSizer>
                {
                  ({ width, height }) => (
                    <List
                      height={height}
                      width={width}
                      itemCount={itemList.length}
                      itemSize={itemSize}
                    >
                      { listChild }
                    </List>
                  )
                }
              </AutoSizer>
            </Suspense>
          );
        } else if (libDisplay === 'cover') {
          return (
            <Suspense fallback={fallBack()}>
              <AutoSizer>
                {
                  ({ width, height }) => (
                    <Grid
                      columnCount={colCount}
                      columnWidth={coverSize * 19.2 * 0.75 + gap}
                      height={height}
                      rowCount={itemList.length / colCount}
                      rowHeight={coverSize * 19.2 + gap}
                      width={width}
                    >
                      { gridChild }
                    </Grid>
                  )
                }
              </AutoSizer>
            </Suspense>
          );
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