const MediaContents = ({ type, id }: any) => {
  if (type === 'videos') {
    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <img
      src={`https://images.igdb.com/igdb/image/upload/t_original/${id}.jpg`}
      alt="media"
      id={`img-${id}`}
    />
  );
};

export default MediaContents;