/* eslint-disable no-else-return */
import React from 'react';
import axios from 'axios';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { sendTo } from '../../../../custom_modules/address';
import { flex } from '../../../../styles';
import { makeListStyle } from '../../styles/LibraryStyles';
import TextLists from './ListTypes/TextLists';
import ImgLists from './ListTypes/ImgLists';

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
            return <TextLists props={{funcs, actions, styles, states}} filter={{isFiltered: false}} />;
          } else {
            const word = new RegExp(librarySearch, 'gi');
            return <TextLists props={{funcs, actions, styles, states}} filter={{isFiltered: true, word}} />;
          }
        } else if (libDisplay === 'cover') {
          if (librarySearch === '') {
            return <ImgLists props={{funcs, actions, styles, states}} filter={{isFiltered: false}} />;
          } else {
            const word = new RegExp(librarySearch, 'gi');
            return <ImgLists props={{funcs, actions, styles, states}} filter={{isFiltered: true, word}} />;
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