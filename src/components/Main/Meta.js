import React, { useState, useEffect, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineZoomIn } from 'react-icons/ai';
import MakeMediaList from './utils/Meta/MakeMediaList'
import ToBack from './utils/Meta/ToBack';
import AgeRatingDistributor from './utils/Meta/AgeRatingDistributor';
import {
  modalStateCreator,
  modalOriginCreator,
  selectedMediaIdCreator,
  selectedMediaListCreator
} from '../../actions';
import { border, flex, sizes } from '../../styles';
import { esrb, pegi, ratings } from '../../custom_modules/imgurls';

const Meta = ({ portrait, heights }) => {
  const selectedItemData = useSelector(state => state.selectedItemData);
  const isMobile = useSelector(state => state.isMobile);
  const [selectedMedia, setSelectedMedia] = useState('screenshots');
  const [isSpread, setIsSpread] = useState(false);
  const [showStat, setShowStat] = useState(false);
  const dispatch = useDispatch();
  const {
    artworks,
    covers,
    collections,
    genres,
    player_perspectives: perspectives,
    platforms,
    game_modes: modes,
    game_videos: videos,
    age_ratings: ages,
    release_dates: release,
    themes,
    screenshots,
    involved_companies: companies,
    websites,
    name,
    summary,
    totalRating
  } = selectedItemData;
  const metaScore = !totalRating ? 0 : totalRating;

  const titles = [
    '시리즈',
    '장르',
    '시점',
    '게임 모드',
    '테마',
    '플랫폼',
    '출시일',
    '개발사 등',
    '관련 링크'
  ];

  const titleVals = [
    collections,
    genres,
    perspectives,
    modes,
    themes,
    platforms,
    release,
    companies,
    websites
  ];

  const websitesCategory = [
    '공식 사이트',
    'Wikia',
    'Wikipedia',
    'Facebook',
    'Twitter',
    'Twitch',
    'Instagram',
    'Youtube',
    'iPhone',
    'iPad',
    'Android',
    'Steam',
    'Reddit',
    'itch',
    'EpicGames',
    'GoG',
    'Discord'
  ];

  useEffect(() => {
    if (selectedItemData.name !== undefined) {
      dispatch(modalStateCreator(false));
    }
  }, [selectedItemData]);

  useEffect(() => {
    if (selectedItemData.name !== undefined) {
      if (selectedMedia === 'screenshots') {
        dispatch(selectedMediaListCreator(screenshots));
      } else if (selectedMedia === 'videos') {
        dispatch(selectedMediaListCreator(videos));
      } else if (selectedMedia === 'artworks') {
        dispatch(selectedMediaListCreator(artworks));
      }
    }
  }, [selectedMedia, selectedItemData]);

  if (selectedItemData.name === undefined) {
    return (
      <article
        id="meta_blank"
        css={css`
          flex: 2;
          z-index: 1;
          ${sizes.full}
          position: relative;
          background: white;
        `}
      ></article>
    );
  }

  return (
    <article
      id="meta"
      css={css`
        flex: 2;
        z-index: 1;
        ${sizes.full}
        position: relative;
        overflow-y: scroll;
        background: white;

        h2 {
          padding-top: var(--gap-standard);
          font-size: 1.823vw;
          text-align: center;
        }

        h3 {
          font-size: 1.563vw;
        }

        #background-cover {
          position: absolute;
          z-index: 0;
          ${sizes.full}
          filter: opacity(0.25) brightness(0.5);
        }

        .meta-wrapper-top {
          padding: var(--gap-standard) calc(var(--gap-standard) * 2);
          z-index: 1;
          position: relative;
          background: rgba(255, 255, 255, 0.6);
          height: 100%;
          overflow-y: scroll;

          .meta-wrapper-ratings {
            ${flex.horizontal}
            ${sizes.full}
            max-height: 13.021vw;
            justify-content: flex-end;

            #game-cover {
              height: 13.021vw;
            }

            #title-and-numerical {
              ${sizes.full}
              ${flex.vertical}
              
              h4 {
                font-size: 0.938vw;
              }

              #numerical-data {
                ${sizes.full}
                ${flex.horizontal}
                justify-content: space-around;

                #game-scores {
                  padding: var(--gap-standard) 0;
                  ${sizes.full}
                  ${flex.vertical}

                  .donut-boundary {
                    position: relative;
                    ${sizes.free(`6.25vw`, `6.25vw`)}
                  }
                  
                  .donut-outline {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                  }
                  
                  .donut-graph-border {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                  }

                  .donut-text {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    ${sizes.free(`3.906vw`, `3.906vw`)}
                    background: var(--white);
                    position: absolute;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 3;
                  }

                  .instalment1 .donut-case {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: var(--grey-dark);
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-clip: border-box;
                    overflow: hidden;
                  }

                  .instalment1 .donut-case::before {
                    content: "";
                    clip: rect(0 6.302vw 3.177vw 0);
                    transform: rotate(${metaScore <= 50 ? `${450 - (metaScore)*3.6}deg` : '270deg'});
                    background: var(--btn-active);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    transition: transform 1s;
                  }

                  .instalment1 .donut-case::after {
                    content: "";
                    clip: rect(0 3.177vw 6.302vw 0);
                    transform: rotate(${metaScore > 50 ? `${360 - (metaScore - 50)*3.6}deg` : '180deg'});
                    background: ${metaScore > 50 ? 'var(--btn-active)' : 'var(--grey-dark)'};
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    transition: transform 1s;
                  }

                  .instalment1 .donut-graph-border::before {
                    content: "";
                    width: 50%;
                    height: 0.104vw;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    background: var(--white);
                    z-index: 2;
                    transform: rotate(90deg);
                    transform-origin: 100%;
                  }

                  .instalment1 .donut-graph-border::after {
                    content: "";
                    width: 50%;
                    height: 0.104vw;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    background: var(--white);
                    z-index: 2;
                    transform: rotate(${270 - metaScore*3.6}deg);
                    transform-origin: 0;
                    transition: transform 1s;
                  }
                }

                #age-rating-wrapper {
                  padding: var(--gap-standard) 0;
                  ${sizes.full}
                  ${flex.vertical}

                  #rating-imgs {
                    ${sizes.full}
                    ${flex.horizontal}

                    img {
                      height: 5.208vw;
                    }

                    img:first-of-type {
                      margin-right: var(--gap-standard);
                    }
                  }
                }
              }
            }
          }

          .meta-wrapper-contents {
            p#summary-container {
              margin: 1.563vw 0;
              padding: var(--gap-standard) calc(var(--gap-standard) * 2);
              font-size: var(--font-size-normal);

              button {
                border: none;
                background: none;
                text-decoration: underline;
                color: blue;
                cursor: pointer;
                box-shadow: none;
              }
            }

            .meta-wrapper-contents-media {
              margin-top: 1.563vw;
              margin-bottom: 2.604vw;
            }
            .media-contents-wrapper {
              .media-tabs {
                button {
                  ${border}
                  border-color: var(--btn-disable);
                  border-radius: 0;
                  border-bottom: none;
                  padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 2);
                  cursor: pointer;
                  box-shadow: none;

                  :hover {
                    -webkit-filter: brightness(90%);
                    filter: brightness(90%);
                  }

                  :active {
                    -webkit-filter: brightness(60%);
                    filter: brightness(60%);
                  }
                }

                button:first-of-type {
                  border-radius: var(--border-rad-big) 0 0 0;
                  background: ${selectedMedia === 'screenshots' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
                }

                button:nth-of-type(2) {
                  background: ${selectedMedia === 'videos' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
                }

                button:last-of-type {
                  border-radius: 0 var(--border-rad-big) 0 0;
                  background: ${selectedMedia === 'artworks' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
                }
              }

              .media-contents {
                ${border}
                border-color: var(--btn-disable);
                padding: var(--gap-standard);
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(20%, auto));
                gap: calc(var(--gap-standard) * 1.5) var(--gap-standard);
                justify-items: center;

                .media-wrapper {
                  position: relative;
                  cursor: pointer;

                  :active {
                    -webkit-transform: scale(0.98);
                    -ms-transform: scale(0.98);
                    transform: scale(0.98);
                  }

                  .player-btn-wrapper {
                    ${sizes.full}
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 2;

                    .player-btn {
                      display: none;
                      border: 0.781vw solid transparent;
                      border-left: 1.302vw solid white;
                      border-right: 0.26vw solid transparent;
                      position: absolute;
                      top: 50%;
                      left: calc(50% + 0.26vw);
                      transform: translate(-50%, -50%);
                      z-index: 1;
                    }

                    svg {
                      color: white;
                      ${sizes.free('1.563vw', '1.563vw')}
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      z-index: 2;

                      * {
                        color: white;
                      }
                    }
                  }

                  img {
                    ${sizes.free('6.25vw', '4.688vw')}
                  }
                }
              }
            }
          }
        }

        @media (orientation: portrait) {
          @media (min-width: 600px) {
            h2 {
              font-size: ${1.823 * 1.778}vw;
            }
  
            h3 {
              font-size: ${1.563 * 1.778}vw;
            }
  
            .meta-wrapper-top {
              .meta-wrapper-ratings {
                max-height: ${13.021 * 1.778}vw;
  
                #game-cover {
                  height: ${13.021 * 1.778}vw;
                }
  
                #title-and-numerical {
                  h4 {
                    font-size: ${0.938 * 1.778}vw;
                  }
    
                  #numerical-data {
                    #game-scores {
                      .donut-boundary {
                        ${sizes.free(`${6.25 * 1.778}vw`, `${6.25 * 1.778}vw`)}
                      }
  
                      .donut-text {
                        ${sizes.free(`${3.906 * 1.778}vw`, `${3.906 * 1.778}vw`)}
                      }
  
                      .instalment1 .donut-case::before {
                        clip: rect(0 ${6.302 * 1.778}vw ${3.177 * 1.778}vw 0);
                      }
    
                      .instalment1 .donut-case::after {
                        clip: rect(0 ${3.177 * 1.778}vw ${6.302 * 1.778}vw 0);
                      }
    
                      .instalment1 .donut-graph-border::before {
                        height: ${0.104 * 1.778}vw;
                      }
    
                      .instalment1 .donut-graph-border::after {
                        height: ${0.104 * 1.778}vw;
                      }
                    }
    
                    #age-rating-wrapper {
                      #rating-imgs {
                        img {
                          height: ${5.208 * 1.778}vw;
                        }
                      }
                    }
                  }
                }
              }
    
              .meta-wrapper-contents {
                p#summary-container {
                  margin: ${1.563 * 1.778}vw 0;
  
                .meta-wrapper-contents-media {
                  margin-top: ${1.563 * 1.778}vw;
                  margin-bottom: ${2.604 * 1.778}vw;
                }
  
                .media-contents-wrapper {
                  .media-tabs {
                    button {
                    }
                  }
    
                  .media-contents {
  
                    .media-wrapper {
                      .player-btn-wrapper {
                        .player-btn {
                          border: ${0.781 * 1.778}vw solid transparent;
                          border-left: ${1.302 * 1.778}vw solid white;
                          border-right: ${0.26 * 1.778}vw solid transparent;
                        }
    
                        svg {
                          ${sizes.free(`${1.563 * 1.778}vw`, `${1.563 * 1.778}vw`)}
                        }
                      }
    
                      img {
                        ${sizes.free(`${6.25 * 1.778}vw`, `${4.688 * 1.778}vw`)}
                      }
                    }
                  }
                }
              }
            }
          }
        }

        @media (orientation: portrait) and (max-width: 599px) {
          h2 {
            padding-top: 20px;
            font-size: 20px;
          }

          h3 {
            font-size: 18px;
          }

          .meta-wrapper-top {
            padding: var(--gap-standard);

            .meta-wrapper-ratings {
              ${sizes.full}
              max-height: 125px;

              #game-cover {
                display: none;
              }

              #title-and-numerical {
                h4 {
                  font-size: 18px;
                }
  
                #numerical-data {
                  #game-scores {
                    .donut-boundary {
                      ${sizes.free(`80px`, `80px`)}
                    }

                    .donut-text {
                      ${sizes.free(`40px`, `40px`)}
                    }

                    .instalment1 .donut-case::before {
                      clip: rect(0 80px 40px 0);
                    }
  
                    .instalment1 .donut-case::after {
                      clip: rect(0 40px 80px 0);
                    }
  
                    .instalment1 .donut-graph-border::before {
                      height: 2px;
                    }
  
                    .instalment1 .donut-graph-border::after {
                      height: 2px;
                    }
                  }
  
                  #age-rating-wrapper {
                    #rating-imgs {
                      img {
                        height: 70px;
                      }
  
                      img:first-of-type {
                        margin-right: 10px;
                      }
                    }
                  }
                }
              }
            }
  
            .meta-wrapper-contents {
              p#summary-container {
                margin: 20px 0;
                padding: 20px;
                font-size: 14px;

                button {
                  box-shadow: none;
                }
              }
  
              .meta-wrapper-contents-media {
                margin-top: 20px;
                margin-bottom: 50px;
              }
              .media-contents-wrapper {
                .media-tabs {
                  button {
                    padding: var(--gap-multiply-small) calc(var(--gap-multiply-small) * 2);
                    box-shadow: none;
                  }
  
                  button:first-of-type {
                    border-radius: 10px 0 0 0;
                  }

                  button:last-of-type {
                    border-radius: 0 10px 0 0;
                  }
                }
  
                .media-contents {
                  padding: 20px;
                  grid-template-columns: repeat(auto-fill, minmax(40%, auto));
                  gap: 10px;

                  .media-wrapper {
                    .player-btn-wrapper {
                      .player-btn {
                        border: 15px solid transparent;
                        border-left: 25px solid white;
                        border-right: 5px solid transparent;
                      }
  
                      svg {
                        color: white;
                        ${sizes.free('30px', '30px')}

                        * {
                          color: white;
                        }
                      }
                    }
  
                    img {
                      ${sizes.free('80px', '60px')}
                    }
                  }
                }
              }
            }
          }
        }
      `}
    >
      <img
        id="background-cover"
        src={
          selectedItemData.covers
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${covers}.png`
            : ''
        }
        alt="cover-background"
      />
      <article className="meta-wrapper-top">
        <div className="meta-wrapper-ratings">
          <img
            id="game-cover"
            src={
              selectedItemData.covers
                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${covers}.png`
                : ''
            }
            alt="game-cover"
          />
          <div id="title-and-numerical">
            <h2>{name}</h2>
            <div id="numerical-data">
              <div id="game-scores">
                <div className="donut-boundary instalment1">
                  <div className="donut-outline"></div>
                  <div className="donut-graph-border"></div>
                  <div className="donut-text">
                    <h3>{selectedItemData.totalRating ? parseInt(metaScore, 10) : 'N/A'}</h3>
                  </div>
                  <div className="donut-case"></div>
                </div>
              </div>
              <div id="age-rating-wrapper">
                <div id="rating-imgs">
                  {
                    ages
                      ?
                        <AgeRatingDistributor
                          ages={ ages }
                          props={{ esrb, pegi, ratings }}
                        />
                      :
                        ''
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <article className="meta-wrapper-contents">
          <p id="summary-container">
            {isSpread ? (
              <>
                {summary
                  .replace(/\n/g, '\n\n')
                  .replace(/\n\n\n/g, '\n\n')
                  .split('\n')
                  .map((line, idx) => (line.length !== 0 ? line : <br key={`br ${idx + 1}`} />))}
                <br />
                <button
                  id="read-less"
                  onClick={e => {
                    e.preventDefault();
                    setIsSpread(false);
                  }}
                >
                  접기
                </button>
              </>
            ) : (
              <>
                {Array.from(summary).slice(0, 430).concat(['... ']).join('')}
                <button
                  id="read-more"
                  onClick={e => {
                    e.preventDefault();
                    setIsSpread(true);
                  }}
                >
                  더 보기
                </button>
              </>
            )}
          </p>
          <article className="meta-wrapper-contents-media">
            <div className="media-contents-wrapper">
              <div className="media-tabs">
                <button
                  onClick={e => {
                    e.preventDefault();
                    setSelectedMedia('screenshots');
                  }}
                >
                  스크린샷({selectedItemData.screenshots ? screenshots.length : 0})
                </button>
                <button
                  onClick={e => {
                    e.preventDefault();
                    setSelectedMedia('videos');
                  }}
                >
                  동영상({videos ? videos.length : 0})
                </button>
                <button
                  onClick={e => {
                    e.preventDefault();
                    setSelectedMedia('artworks');
                  }}
                >
                  기타({selectedItemData.artworks ? artworks.length : 0})
                </button>
              </div>
              <div className="media-contents">
                <MakeMediaList
                  props={{
                    selectedMedia,
                    selectedItemData,
                    setShowStat,
                    showStat,
                    dispatch,
                    modalStateCreator,
                    modalOriginCreator,
                    selectedMediaIdCreator,
                    AiOutlineZoomIn
                  }}
                />
              </div>
            </div>
          </article>
          <article
            className="meta-wrapper-contents-info"
            css={css`
              display: grid;
              grid-template-rows: repeat(auto-fill, 1fr);
              ${border}
              border-bottom: none;

              .table-title {
                border-bottom: 0.052vw solid black;
                border-right: 0.156vw double black;
                padding: var(--gap-standard) 0;
                ${flex.vertical}
                background: var(--btn-disable);
                color: var(--white);
                font-size: 0.938vw;
                font-weight: bold;
              }

              .table-contents {
                display: grid;
                grid-template-rows: repeat(auto-fill, 1fr);
                font-size: 0.833vw;

                div {
                  border-bottom: 0.052vw solid black;
                  padding: var(--gap-multiply-small) 0;
                  ${sizes.full}
                  ${flex.vertical}
                }
              }
              .table-sub-title, .table-sub-contents {
                border-bottom: 0.052vw solid black;
                border-right: 0.052vw solid black;
                padding: var(--gap-multiply-small) 0;
                ${flex.vertical}
                font-size: 0.833vw;
                font-weight: bold;
              }

              .table-sub-contents {
                border-right: none;
                font-weight: normal;
              }

              @media (orientation: portrait) {
                @media (min-width: 600px) {
                  .table-title {
                    border-bottom: ${0.052 * 1.778}vw solid black;
                    border-right: ${0.156 * 1.778}vw double black;
                    font-size: ${0.938 * 1.778}vw;
                  }
  
                  .table-contents {
                    font-size: ${0.833 * 1.778}vw;
  
                    div {
                      border-bottom: ${0.052 * 1.778}vw solid black;
                    }
                  }
  
                  .table-sub-title, .table-sub-contents {
                    border-bottom: ${0.052 * 1.778}vw solid black;
                    border-right: ${0.052 * 1.778}vw solid black;
                    font-size: ${0.833 * 1.778}vw;
                  }

                  a {
                  }
                }

                @media (max-width: 599px) {
                  // grid-template-rows: repeat(auto-fill, 1fr);

                  .table-title {
                    border-bottom: 1px solid black;
                    border-right: 3px double black;
                    padding: 20px 0;
                    font-size: 12px;
                  }

                  .table-contents {
                    // grid-template-rows: repeat(auto-fill, 1fr);
                    font-size: 10px;

                    div {
                      border-bottom: 1px solid black;
                      padding: 5px 0;
                    }
                  }
                  .table-sub-title, .table-sub-contents {
                    border-bottom: 1px solid black;
                    border-right: 1px solid black;
                    padding: 5px 0;
                    font-size: 10px;
                    text-align: center;
                  }

                  .table-sub-contents {
                    a {
                    }
                  }
                }
              }
            `}
          >
            <div
              css={css`
                display: grid;
                grid-template-columns: repeat(1, 1fr 3fr);
              `}
            >
              {titleVals.map((vals, idx) => {
                let result = '';
                if (titles[idx] === '출시일') {
                  let releaseCheckList = {};
                  vals.sort((prev, next) => prev.platform_name[0] < next.platform_name[0] ? -1 : 1);
                  result = (
                    <Fragment key={`frag-${titles[idx]}`}>
                      <div
                        key={`${titles[idx]}-title-${idx+1}`}
                        className="table-title"
                      >{titles[idx]}</div>
                      <div
                        key={`${titles[idx]}-value-${idx+1}`}
                        css={css`
                          display: grid;
                          grid-template-columns: repeat(2, 1fr);
                        `}
                      >
                        {vals.map((val, subidx) => {
                          let res = '';
                          if (releaseCheckList[val.platform_name] !== true) {
                            releaseCheckList[val.platform_name] = true;
                            res = (
                              <Fragment key={`release_info-${subidx+1}`}>
                                <div
                                  key={`release_platform_name-${subidx+1}`}
                                  className="table-sub-title"
                                >
                                  {val.platform_name}
                                </div>
                                <div
                                  key={`date-${subidx+1}`}
                                  className="table-sub-contents"
                                >
                                  {val.human}
                                </div>
                              </Fragment>
                            );
                          }
                          if (subidx === vals.length - 1) {
                            releaseCheckList = {};
                          }
                          return res;
                        })}
                      </div>
                    </Fragment>
                  );
                } else if (titles[idx] === '개발사 등') {
                  vals.reverse();
                  result = (
                    <Fragment key={`frag-${titles[idx]}`}>
                      <div
                        key={`${titles[idx]}-title-${idx+1}`}
                        className="table-title"
                      >{titles[idx]}</div>
                      <div
                        key={`${titles[idx]}-ext_cont-${idx+1}`}
                        css={css`
                          display: grid;
                          grid-template-rows: repeat(auto-fill, 1fr);
                        `}
                      >
                        <div
                          key={`${titles[idx]}-inn_cont_1-${idx+1}`}
                          css={css`
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                          `}
                        >
                          <div
                            key={`dev-${idx+1}`}
                            className="table-sub-title"
                          >
                            개발사
                          </div>
                          <div key={`dev_comp_cont-${idx+1}`}>
                            {vals.filter(val => val.developer === true).length !== 0
                            ? vals.map((val, subidx) => {
                                let res = '';
                                if (val.developer === true) {
                                  res = (
                                    <div
                                      key={`dev_comp-${subidx+1}`}
                                      className="table-sub-contents"
                                    >
                                      {val.company_name}
                                    </div>
                                  );
                                }
                                return res;
                              })
                            : <div
                                key={`dev_comp-${idx+1}`}
                                className="table-sub-contents"
                              >
                                N/A
                              </div>
                          }
                          </div>
                        </div>
                        <div
                          key={`${titles[idx]}-inn_cont_2-${idx+1}`}
                          css={css`
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                          `}
                        >
                          <div
                            key={`prod-${idx+1}`}
                            className="table-sub-title"
                          >
                            배급사
                          </div>
                          <div key={`prod_comp_cont-${idx+1}`}>
                            {vals.filter(val => val.publisher === true).length !== 0
                            ? vals.map((val, subidx) => {
                                let res = '';
                                if (val.publisher === true) {
                                  res = (
                                    <div
                                      key={`prod_comp-${subidx+1}`}
                                      className="table-sub-contents"
                                    >
                                      {val.company_name}
                                    </div>
                                  );
                                }
                                return res;
                              })
                            : <div
                                key={`prod_comp-${idx+1}`}
                                className="table-sub-contents"
                              >
                                N/A
                              </div>
                          }
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  );
                } else if (titles[idx] === '관련 링크') {
                  vals.sort((prev, next) => prev.category < next.category ? -1 : 1);
                  result = (
                    <Fragment key={`frag-${titles[idx]}`}>
                      <div
                        key={`${titles[idx]}-title-${idx+1}`}
                        className="table-title"
                      >{titles[idx]}</div>
                      <div
                        key={`${titles[idx]}-ext_cont-${idx+1}`}
                        css={css`
                          display: grid;
                          grid-template-columns: repeat(2, 1fr);
                        `}
                      >
                        {vals.map((val, subidx) => {
                          let res = '';
                          const categoryIdx = val.category < 7 ? val.category : val.category - 1;
                          res = (
                            <Fragment key={`web_frag-${subidx+1}`}>
                              <div
                                key={`web_title-${subidx+1}`}
                                className="table-sub-title"
                              >
                                {websitesCategory[categoryIdx - 1]}
                              </div>
                              <div
                                key={`web_link-${subidx+1}`}
                                className="table-sub-contents"
                              >
                                <a key={`link-${subidx+1}`} href={val.url}>링크</a>
                              </div>
                            </Fragment>
                          );
                          return res;
                        })}
                      </div>
                    </Fragment>
                  );
                } else {
                  result = (
                    <Fragment key={`frag-${titles[idx]}`}>
                      <div
                        key={`${titles[idx]}-title-${idx+1}`}
                        className="table-title"
                      >{titles[idx]}</div>
                      <div
                        key={`${titles[idx]}-val_wrap-${idx+1}`}
                        className="table-contents"
                      >
                        {vals.map((val, subidx) => (<div key={`${titles[idx]}-val-${subidx+1}`}>{val}</div>))}
                      </div>
                    </Fragment>
                  );
                }
                return result;
              })}
            </div>
          </article>
        </article>
      </article>
      {
        portrait || isMobile
          ? <ToBack heights={heights} />
          : <></>
      }
    </article>
  );
};

export default Meta;
