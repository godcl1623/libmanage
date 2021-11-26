import React, { useState, useEffect, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineZoomIn } from 'react-icons/ai';
import {
  modalStateCreator,
  modalOriginCreator,
  selectedMediaIdCreator,
  selectedMediaListCreator
} from '../../actions';
import { border, flex, sizes } from '../../styles';
import { esrb, pegi, ratings } from '../../custom_modules/imgurls';

const MakeMediaList = ({ ...props }) => {
  const {
    target,
    itemData,
    setShowStat,
    showStat,
    dispatch,
    modalStateCreator,
    modalOriginCreator,
    selMediaIdCreator
  } = props;
  let targetMedia = itemData.screenshots;
  switch (target) {
    case 'videos':
      targetMedia = itemData.game_videos;
      break;
    case 'artworks':
      targetMedia = itemData.artworks;
      break;
    default:
      targetMedia = itemData.screenshots;
  }
  if (target === 'videos') {
    return targetMedia
      ? targetMedia.map((media, idx) => (
          <div
            className="media-wrapper"
            id={`media-wrapper-${idx + 1}`}
            key={`media-wrapper-${idx + 1}`}
            onMouseEnter={e => {
              e.preventDefault();
              const currMideaWrap = document.querySelector(`#media-wrapper-${idx + 1}`);
              const currImg = currMideaWrap.querySelector('img');
              const currPlayBtn = currMideaWrap.querySelector('.player-btn');
              currImg.style.filter = 'brightness(70%)';
              currPlayBtn.style.display = 'block';
            }}
            onMouseLeave={e => {
              e.preventDefault();
              const currMideaWrap = document.querySelector(`#media-wrapper-${idx + 1}`);
              const currImg = currMideaWrap.querySelector('img');
              const currPlayBtn = currMideaWrap.querySelector('.player-btn');
              currImg.style.filter = 'brightness(100%)';
              currPlayBtn.style.display = 'none';
            }}
          >
            <div
              className="player-btn-wrapper"
              key={`player-btn-wrapper-${idx + 1}`}
              onClick={e => {
                e.preventDefault();
                dispatch(modalStateCreator(true));
                dispatch(modalOriginCreator(`meta-${target}`));
                dispatch(selMediaIdCreator(media));
              }}
            >
              <div className="player-btn" key={`player-btn-${idx + 1}`} />
            </div>
            <img
              key={`${media}_${idx}`}
              src={`https://img.youtube.com/vi/${media}/2.jpg`}
              alt={`video_thumb_${idx + 1}`}
            />
          </div>
        ))
      : '';
  }
  return targetMedia
    ? targetMedia.map((media, idx) => (
        <div
          className="media-wrapper"
          id={`media-wrapper-${idx + 1}`}
          key={`media-wrapper-${idx + 1}`}
          onMouseEnter={e => {
            e.preventDefault();
            const currMideaWrap = document.querySelector(`#media-wrapper-${idx + 1}`);
            const currImg = currMideaWrap.querySelector('img');
            currImg.style.filter = 'brightness(70%)';
            setShowStat(currMideaWrap.id);
          }}
          onMouseLeave={e => {
            e.preventDefault();
            const currMideaWrap = document.querySelector(`#media-wrapper-${idx + 1}`);
            const currImg = currMideaWrap.querySelector('img');
            currImg.style.filter = 'brightness(100%)';
            setShowStat(false);
          }}
        >
          <div
            className="player-btn-wrapper"
            key={`player-btn-wrapper-${idx + 1}`}
            onClick={e => {
              e.preventDefault();
              dispatch(modalStateCreator(true));
              dispatch(modalOriginCreator(`meta-${target}`));
              dispatch(selMediaIdCreator(media));
            }}
          >
            {showStat === `media-wrapper-${idx + 1}` ? <AiOutlineZoomIn /> : ''}
          </div>
          <img
            key={`${media}_${idx}`}
            src={`https://images.igdb.com/igdb/image/upload/t_thumb/${media}.jpg`}
            alt={`artworks_${idx + 1}`}
          />
        </div>
      ))
    : '';
};

const ageRatingDistributor = ages =>
  ages.map(age => {
    let targetRating = '';
    let ageRatingsImgUrls = {};
    const { category, rating } = age;
    switch (category) {
      case 1:
        targetRating = 'esrb';
        break;
      case 2:
        targetRating = 'pegi';
        break;
      default:
        targetRating = '';
        break;
    }
    switch (targetRating) {
      case 'esrb':
        ageRatingsImgUrls = esrb;
        break;
      case 'pegi':
        ageRatingsImgUrls = pegi;
        break;
      default:
        ageRatingsImgUrls = {};
        break;
    }
    return (
      <img
        key={`${targetRating}-${ratings[rating]}`}
        src={`${ageRatingsImgUrls[rating]}`}
        alt={`${targetRating}-${ratings[rating]}`}
      />
    );
  });

const Meta = () => {
  const selectedItemData = useSelector(state => state.selectedItemData);
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
    if (selectedItemData.artworks !== undefined) {
      if (selectedMedia === 'screenshots') {
        dispatch(selectedMediaListCreator(screenshots));
      } else if (selectedMedia === 'videos') {
        dispatch(selectedMediaListCreator(videos));
      } else if (selectedMedia === 'artworks') {
        dispatch(selectedMediaListCreator(artworks));
      }
    }
  }, [selectedMedia, selectedItemData]);

  if (selectedItemData.artworks === undefined) {
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

        * {
          // ${border}
        }

        h2 {
          // padding-top: 20px;
          // font-size: 35px;
          padding-top: 1.042vw;
          font-size: 1.823vw;
          text-align: center;
        }

        h3 {
          // font-size: 30px;
          font-size: 1.563vw;
        }

        #background-cover {
          position: absolute;
          z-index: 0;
          ${sizes.full}
          filter: opacity(0.25) brightness(0.5);
        }

        .meta-wrapper-top {
          // padding: 20px 40px;
          padding: 1.042vw 2.083vw;
          z-index: 1;
          position: relative;
          background: rgba(255, 255, 255, 0.6);
          height: 100%;
          overflow-y: scroll;

          .meta-wrapper-ratings {
            ${flex.horizontal}
            ${sizes.full}
            // max-height: 250px;
            max-height: 13.021vw;
            justify-content: flex-end;

            #game-cover {
              // height: 250px;
              height: 13.021vw;
            }

            #title-and-numerical {
              ${sizes.full}
              ${flex.vertical}
              
              h4 {
                // font-size: 18px;
                font-size: 0.938vw;
              }

              #numerical-data {
                ${sizes.full}
                ${flex.horizontal}
                justify-content: space-around;

                #game-scores {
                  // padding: 20px 0;
                  padding: 1.042vw 0;
                  ${sizes.full}
                  ${flex.vertical}

                  .donut-boundary {
                    position: relative;
                    // width: 120px;
                    // height: 120px;
                    width: 6.25vw;
                    height: 6.25vw;
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
                    // width: 75px;
                    // height: 75px;
                    width: 3.906vw;
                    height: 3.906vw;
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
                    // clip: rect(0 120px 60px 0);
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
                    // clip: rect(0 60px 120px 0);
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
                    // height: 2px;
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
                    // height: 2px;
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
                  // padding: 20px 0;
                  padding: 1.042vw 0;
                  ${sizes.full}
                  ${flex.vertical}

                  #rating-imgs {
                    ${sizes.full}
                    ${flex.horizontal}

                    img {
                      // height: 100px;
                      height: 5.208vw;
                    }

                    img:first-of-type {
                      // margin-right: 20px;
                      margin-right: 1.042vw;
                    }
                  }
                }
              }
            }
          }

          .meta-wrapper-contents {
            p#summary-container {
              // margin: 30px 0;
              // padding: 20px 40px;
              // font-size: 20px;
              margin: 1.563vw 0;
              padding: 1.042vw 2.083vw;
              font-size: 1.042vw;

              button {
                border: none;
                box-shadow: none;
                background: none;
                text-decoration: underline;
                color: blue;
                cursor: pointer;
              }
            }

            .meta-wrapper-contents-media {
              // margin-top: 30px;
              // margin-bottom: 50px;
              margin-top: 1.563vw;
              margin-bottom: 2.604vw;
            }
            .media-contents-wrapper {
              .media-tabs {
                button {
                  border-radius: 0;
                  // box-shadow: 0 -1px 2px 1px var(--grey-dark);
                  box-shadow: 0 -0.052vw 0.104vw 0.052vw var(--grey-dark);
                  border-bottom: none;
                  // padding: 5px 10px;
                  padding: 0.26vw 0.521vw;
                  cursor: pointer;

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
                  // border-radius: 10px 0 0 0;
                  border-radius: 0.521vw 0 0 0;
                  background: ${selectedMedia === 'screenshots' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
                }

                button:nth-of-type(2) {
                  background: ${selectedMedia === 'videos' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
                }

                button:last-of-type {
                  // border-radius: 0 10px 0 0;
                  border-radius: 0 0.521vw 0 0;
                  background: ${selectedMedia === 'artworks' ? 'var(--highlight-light)' : 'var(--btn-disable)'};
                }
              }

              .media-contents {
                // padding: 20px;
                // box-shadow: 0 0 2px 1px var(--grey-dark);
                padding: 1.042vw;
                box-shadow: 0 0 0.104vw 0.052vw var(--grey-dark);
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(20%, auto));
                // gap: 30px 20px;
                gap: 1.563vw 1.042vw;
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
                      // border: 15px solid transparent;
                      // border-left: 25px solid white;
                      // border-right: 5px solid transparent;
                      border: 0.781vw solid transparent;
                      border-left: 1.302vw solid white;
                      border-right: 0.26vw solid transparent;
                      position: absolute;
                      top: 50%;
                      // left: calc(50% + 5px);
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
                <div id="rating-imgs">{ages ? ageRatingDistributor(ages) : ''}</div>
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
                  target={selectedMedia}
                  itemData={selectedItemData}
                  setShowStat={setShowStat}
                  showStat={showStat}
                  dispatch={dispatch}
                  modalStateCreator={modalStateCreator}
                  modalOriginCreator={modalOriginCreator}
                  selMediaIdCreator={selectedMediaIdCreator}
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
                // border-bottom: 1px solid black;
                // border-right: 3px double black;
                // padding: 20px 0;
                border-bottom: 0.052vw solid black;
                border-right: 0.156vw double black;
                padding: 1.042vw 0;
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
                  // border-bottom: 1px solid black;
                  // padding: 5px 0;
                  border-bottom: 0.052vw solid black;
                  padding: 0.26vw 0;
                  ${sizes.full}
                  ${flex.vertical}
                }
              }
              .table-sub-title, .table-sub-contents {
                // border-bottom: 1px solid black;
                // border-right: 1px solid black;
                // padding: 5px 0;
                border-bottom: 0.052vw solid black;
                border-right: 0.052vw solid black;
                padding: 0.26vw 0;
                ${flex.vertical}
                font-size: 0.833vw;
                font-weight: bold;
              }

              .table-sub-contents {
                border-right: none;
                font-weight: normal;
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
    </article>
  );
};

export default Meta;
