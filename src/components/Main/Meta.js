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

const ageRatingDistributor = ages => (
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
      <img src={`${ageRatingsImgUrls[rating]}`} alt={`${targetRating}-${ratings[rating]}`} />
    );
  })
);

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

  if (selectedItem === '') {
    return (
      <article
        id="meta_blank"
        style={{
          flex: '2',
          zIndex: '1',
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
      </article>
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
          ${border}
        }

        h2 {
          // padding-left: 210px;
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
              #numerical-data {
                ${sizes.full}
                ${flex.horizontal}
  
                #age-rating-wrapper {
                  img {
                    height: 100px;
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
                <h4>Scores</h4>
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
                <h4>Ratings</h4>
                {ages ? ageRatingDistributor(ages) : ''}
              </div>
            </div>
          </div>
        </div>
        <article className="meta-wrapper-contents">
          <p>{summary}</p>
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
