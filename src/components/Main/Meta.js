import React from 'react';
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
  const selectedItem = useSelector(state => state.selectedItem);
  const selectedItemData = useSelector(state => state.selectedItemData);
  const [selectedMedia, setSelectedMedia] = React.useState('screenshots');
  const [isSpread, setIsSpread] = React.useState(false);
  const [showStat, setShowStat] = React.useState(false);
  const dispatch = useDispatch();
  const {
    artworks,
    covers,
    collections,
    genres,
    player_perspectives: perspectives,
    franchises,
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
  const titles = [
    '장르',
    '시점',
    '게임 모드',
    '테마',
    '플랫폼',
    '출시일',
    '개발사 등',
    '시리즈',
    '관련 링크'
  ];
  const titleVals = [
    genres,
    perspectives,
    modes,
    themes,
    platforms,
    release,
    companies,
    collections,
    websites
  ];
  let releaseCheckList = {};
  React.useEffect(() => {
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

        * {
          // ${border}
        }

        h2 {
          padding-top: 20px;
          font-size: 35px;
          text-align: center;
        }

        h3 {
          font-size: 30px;
        }

        #background-cover {
          position: absolute;
          z-index: 0;
          ${sizes.full}
          filter: opacity(0.25) brightness(0.5);
        }

        .meta-wrapper-top {
          padding: 20px 40px;
          z-index: 1;
          position: relative;
          background: rgba(255, 255, 255, 0.6);
          height: 100%;
          overflow-y: scroll;

          .meta-wrapper-ratings {
            ${flex.horizontal}
            ${sizes.full}
            max-height: 250px;
            justify-content: flex-end;

            #game-cover {
              height: 250px;
            }

            #title-and-numerical {
              ${sizes.full}
              ${flex.vertical}
              
              h4 {
                font-size: 18px;
              }

              #numerical-data {
                ${sizes.full}
                ${flex.horizontal}
                justify-content: space-around;

                #game-scores {
                  padding: 20px 0;
                  ${sizes.full}
                  ${flex.vertical}
                }

                #age-rating-wrapper {
                  padding: 20px 0;
                  ${sizes.full}
                  ${flex.vertical}

                  #rating-imgs {
                    ${sizes.full}
                    ${flex.horizontal}

                    img {
                      height: 100px;
                    }

                    img:first-of-type {
                      margin-right: 20px;
                    }
                  }
                }
              }
            }
          }

          .meta-wrapper-contents {
            p#summary-container {
              margin: 30px 0;
              padding: 20px 40px;
              font-size: 20px;

              button {
                border: none;
                background: none;
                text-decoration: underline;
                color: blue;
                cursor: pointer;
              }
            }

            .media-contents-wrapper {
              .media-tabs {
                button {
                  border-radius: 0;
                  ${border}
                  border-bottom: none;
                  padding: 5px 10px;
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
                  border-radius: 10px 0 0 0;
                  background: ${selectedMedia === 'screenshots' ? 'white' : 'grey'};
                }

                button:nth-of-type(2) {
                  background: ${selectedMedia === 'videos' ? 'white' : 'grey'};
                }

                button:last-of-type {
                  border-radius: 0 10px 0 0;
                  background: ${selectedMedia === 'artworks' ? 'white' : 'grey'};
                }
              }

              .media-contents {
                padding: 20px;
                ${border}
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(20%, auto));
                gap: 30px 20px;
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
                      border: 15px solid transparent;
                      border-left: 25px solid white;
                      border-right: 5px solid transparent;
                      position: absolute;
                      top: 50%;
                      left: calc(50% + 5px);
                      transform: translate(-50%, -50%);
                      z-index: 1;
                    }

                    svg {
                      color: white;
                      ${sizes.free('30px', '30px')}
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      z-index: 2;
                    }
                  }

                  img {
                    ${sizes.free('120px', '90px')}
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
                {/* <h4>Scores</h4> */}
                <div className="donut-boundary instalment1">
                  <div className="donut-outline"></div>
                  <div className="donut-graph-border"></div>
                  <div className="donut-text">
                    <h3>{selectedItemData.totalRating ? parseInt(totalRating, 10) : ''}</h3>
                  </div>
                  <div className="donut-case"></div>
                </div>
              </div>
              <div id="age-rating-wrapper">
                {/* <h4>Ratings</h4> */}
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
          <article className="meta-wrapper-contents-info"
            css={css`
              display: grid;
              grid-template-rows: repeat(1, 1fr);
              * {
                ${border}
              }
            `}
          >
            <div
              css={css`
                display: grid;
                grid-template-columns: repeat(2, 1fr);
              `}
            >
              {/* <div>출시일</div>
              <div
                css={css`
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                `}
              >
                {release.map((set, idx) => {
                  let result = '';
                  if (releaseCheckList[set.platform_name] !== true) {
                    releaseCheckList[set.platform_name] = true;
                    console.log(releaseCheckList)
                    result = (
                      <>
                        <div>{set.platform_name}</div>
                        <div>{set.human}</div>
                      </>
                    );
                  }
                  if (idx === release.length - 1) {
                    releaseCheckList = {};
                  }
                  return result;
                })}
              </div> */}
              {titleVals.map((val, idx) => {
                console.log(val)
              })}
            </div>
            {/* <div className="info-title">
              장르 시점 게임 모드 테마 플랫폼 출시일 개발사 등 시리즈 프랜차이즈 연령 제한 관련 링크
            </div>
            <div className="info-contents">
              {genres}
              {perspectives}
              {modes}
              {themes}
              {platforms}
              {release ? release[0].human : '0000-00-00'}
              {companies ? companies[0].company_name : ''}
              {collections}
              {franchises}
              {selectedItemData.websites ? websites[0] : ''}
            </div> */}
          </article>
        </article>
        {/* </article> */}
      </article>
    </article>
  );
};

export default Meta;
