import React from 'react';
import { useSelector } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { border, flex, sizes } from '../../styles';
import { esrb, pegi, ratings } from '../../custom_modules/imgurls';

const MakeMediaList = ({ target, itemData }) => {
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
          // <iframe
          //   width="560"
          //   height="315"
          //   src={`https://www.youtube.com/embed/${media}`}
          //   title="YouTube video player"
          //   frameborder="0"
          //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          //   allowfullscreen
          // />
          <img
            key={`${media}_${idx}`}
            src={`https://img.youtube.com/vi/${media}/2.jpg`}
            alt="video_thumb"
          />
        ))
      : '';
  }
  return targetMedia
    ? targetMedia.map((media, idx) => (
        <img
          key={`${media}_${idx}`}
          src={`https://images.igdb.com/igdb/image/upload/t_thumb/${media}.jpg`}
          alt="artworks"
        />
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
    return <img src={`${ageRatingsImgUrls[rating]}`} alt={`${targetRating}-${ratings[rating]}`} />;
  });

const Meta = () => {
  const selectedItem = useSelector(state => state.selectedItem);
  const selectedItemData = useSelector(state => state.selectedItemData);
  const [selectedMedia, setSelectedMedia] = React.useState('screenshots');
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
            p {
              margin: 30px 0;
              padding: 20px 40px;
              font-size: 20px;
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
                grid-template-columns: repeat(5, 1fr);
                gap: 30px 20px;
                justify-items: center;

                img {
                  cursor: pointer;

                  :hover {
                    -webkit-filter: brightness(70%);
                            filter: brightness(70%);
                  }

                  :active {
                    -webkit-transform: scale(0.98);
                        -ms-transform: scale(0.98);
                            transform: scale(0.98);
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
          {/*
            #################### 규칙 ####################
            1. 더 보기 버튼을 누르지 않은 상태면 slice로 429번 인덱스까지 잘라낸다
            2. 430번 인덱스에 ...와 더 보기 버튼을 삽입한다 -> 더 보기, 줄이기 버튼 추가
            3. 이 때 \n을 <br/>로 바꾸지 않는다
            4. 더 보기 버튼을 누르면 slice를 해제하고 모든 텍스트를 표시한다
            5. 이 때 \n을 <br />로 바꾼다
          */}
          <p>
            {summary
              .replace(/\n/g, '\n\n')
              .replace(/\n\n\n/g, '\n\n')
              .split('\n')
              .map(line => (line.length !== 0 ? line : <br />))}
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
              {/* 재생버튼 예제 -> 동영상에 적용, 나머지는 react-icons로 돋보기 아이콘? */}
              <div
                css={css`
                  ${sizes.free('100px', '100px')}
                `}
              >
                <div
                  css={css`
                    border: 50px solid transparent;
                    border-left: 100px solid tomato;
                  `}
                />
              </div>
              <div className="media-contents">
                <MakeMediaList target={selectedMedia} itemData={selectedItemData} />
              </div>
            </div>
          </article>
          <article className="meta-wrapper-contents-info">
            <div className="info-title">
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
              {ages ? ages[0].rating : ''}
              {selectedItemData.websites ? websites[0] : ''}
            </div>
          </article>
        </article>
        {/* </article> */}
      </article>
    </article>
  );
};

export default Meta;
