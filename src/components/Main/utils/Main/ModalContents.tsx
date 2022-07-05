/* eslint-disable no-else-return */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MemberInfoWrap from '../../../Member/MemberInfoWrap';
import ModalHeaderOption from './ModalContents/ModalHeaderOption';
import ModalMetaMedia from './ModalContents/ModalMetaMedia';
import { sizes, flex } from '../../../../styles';
import { defaultContentsStyle } from '../../styles/modals/ModalContentsStyles';
import { StyleSet } from '../../../../custom_modules/commonUtils';

const ModalContents = ({ args }: any) => {
  const {
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
  } = args;
  const caution = <p>※ 현재 기술적 문제로 Steam 서비스만 지원됩니다.</p>;
  if (modalOrigin === 'Header_Option') {
    return (
      <ModalHeaderOption
        props={{
          userState,
          dispatch,
          comparisonStateCreator,
          modalStateCreator,
          setUserLibrary,
          selectedItemDataCreator,
          caution,
          setStoresList
        }}
      />
    );
  } else if (modalOrigin === 'Header_MemInfo') {
    return <MemberInfoWrap />;
  } else if (modalOrigin.split('-')[0] === 'meta') {
    const target = modalOrigin.split('-')[1];
    return (
      <ModalMetaMedia
        props={{
          dispatch,
          modalStateCreator,
          selectedMediaId,
          selectedMediaIdCreator,
          selectedMediaList,
          target
        }}
      />
    );
  }
  return (
    <article
      css={css`${defaultContentsStyle({ flex, sizes } as StyleSet)}`}
    >
      <h1>Loading...</h1>
    </article>
  );
};

export default ModalContents;