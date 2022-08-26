const MakeMediaList = ({ props }: any) => {
  const {
    selectedMedia,
    selectedItemData,
    setShowStat,
    showStat,
    dispatch,
    modalStateCreator,
    modalOriginCreator,
    selectedMediaIdCreator,
    AiOutlineZoomIn
  } = props;
  let targetMedia = selectedItemData.screenshots;
  switch (selectedMedia) {
    case 'videos':
      targetMedia = selectedItemData.game_videos;
      break;
    case 'artworks':
      targetMedia = selectedItemData.artworks;
      break;
    default:
      targetMedia = selectedItemData.screenshots;
  }
  if (selectedMedia === 'videos') {
    return targetMedia
      ? targetMedia.map((media: string, idx: number) => (
          <div
            className="media-wrapper"
            id={`media-wrapper-${idx + 1}`}
            key={`media-wrapper-${idx + 1}`}
            onMouseEnter={e => {
              e.preventDefault();
              const currMideaWrap = document.querySelector(`#media-wrapper-${idx + 1}`) as HTMLElement;
              const currImg = currMideaWrap.querySelector('img') as HTMLImageElement;
              const currPlayBtn = currMideaWrap.querySelector('.player-btn') as HTMLButtonElement;
              currImg.style.filter = 'brightness(70%)';
              currPlayBtn.style.display = 'block';
            }}
            onMouseLeave={e => {
              e.preventDefault();
              const currMideaWrap = document.querySelector(`#media-wrapper-${idx + 1}`) as HTMLElement;
              const currImg = currMideaWrap.querySelector('img') as HTMLImageElement;
              const currPlayBtn = currMideaWrap.querySelector('.player-btn') as HTMLButtonElement;
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
                dispatch(modalOriginCreator(`meta-${selectedMedia}`));
                dispatch(selectedMediaIdCreator(media));
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
    ? targetMedia.map((media: string, idx: number) => (
        <div
          className="media-wrapper"
          id={`media-wrapper-${idx + 1}`}
          key={`media-wrapper-${idx + 1}`}
          onMouseEnter={e => {
            e.preventDefault();
            const currMideaWrap = document.querySelector(`#media-wrapper-${idx + 1}`) as HTMLElement;
            const currImg = currMideaWrap.querySelector('img') as HTMLImageElement;
            currImg.style.filter = 'brightness(70%)';
            setShowStat(currMideaWrap.id);
          }}
          onMouseLeave={e => {
            e.preventDefault();
            const currMideaWrap = document.querySelector(`#media-wrapper-${idx + 1}`) as HTMLElement;
            const currImg = currMideaWrap.querySelector('img') as HTMLImageElement;
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
              dispatch(modalOriginCreator(`meta-${selectedMedia}`));
              dispatch(selectedMediaIdCreator(media));
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

export default MakeMediaList;