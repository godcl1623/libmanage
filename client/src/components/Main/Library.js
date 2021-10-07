/* eslint-disable no-else-return */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Balloon from '../Modal/Balloon';
import {
  balloonStateCreator,
  balloonOriginCreator,
  libDisplayStateCreator
} from '../../actions';

const Options = ({ dispatch, changeState }) => (
  <>
    <h3>표시방식:</h3>
    <button
      onClick={e => {
        e.preventDefault();
        dispatch(changeState('list'));
      }}
    >리스트</button>
    <button
      onClick={e => {
        e.preventDefault();
        dispatch(changeState('cover'));
      }}
    >썸네일</button>
    <input type="range" />
  </>
);

const testBtns = (state, setState) => (
  <>
    <button
        onClick={e => {
          axios.post('http://localhost:3003/api/connect', {execute: 'order66'}, {withCredentials: true})
            .then(res => {
              setState(res.data)
            })
        }}
      >
        api 인증
      </button>
      <button
        onClick={e => {
          axios.post('http://localhost:3003/meta_search', {apiCred: state}, {withCredentials: true})
            .then(res => console.log(res))
        }}
      >
        검색 테스트
      </button>
  </>
);

const makeList = (source, displayState) => {
  if (source !== '') {
    if (displayState === 'list') {
      const result = source.map((item, index) => (
        <li key={index}>{item.title}</li>
      ));
      return result;
    } else if (displayState === 'cover') {
      const result = source.map((item, index) => (
        <li
          key={`img-${index}`}
          style={{
            'margin': '10px',
            'height': '15vw',
            'flex': '0 0 10%',
            'display': 'flex',
            'justify-content': 'center',
            'align-items': 'center'
          }}
        >
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover}.png`}
            title={`${item.title}`}
            alt={`${item.title}-cover`}
            style={{
              'height': '100%'
            }}
          />
        </li>
      ));
      return result;
    }
  }
}

const Library = ({ userLib }) => {
  // const [balloonState, setBalloonState] = React.useState('none');
  const balloonState = useSelector(state => state.balloonState);
  const balloonOrigin = useSelector(state => state.balloonOrigin);
  const libDisplay = useSelector(state => state.libDisplay);
  const [ btnCoords, setBtnCoords ] = React.useState({});
  // const [apiAuth, setApiAuth] = React.useState('');
  const dispatch = useDispatch();
  const ref = React.useRef();
  const updateBtnCoords = (left, top) => {
    setBtnCoords(prevState => ({
      ...prevState,
      leftCoord: left,
      topCoord: top
    }));
  };
  console.log(userLib)
  React.useEffect(() => {
    const { left, top } = ref.current.getBoundingClientRect();
    updateBtnCoords(left, top);
  }, []);

  const wrapper = {
    'display': balloonOrigin === 'Library' ? balloonState : 'none',
    'position': 'absolute',
    'top': '0',
    'right': '0',
    // 'background': 'rgba(0, 0, 0, 0.3)',
    'width': '100%',
    'height': '100%',
    'zIndex': '1'
  }

  const style = {
    'padding': '20px',
    'display': balloonOrigin === 'Library' ? balloonState : 'none',
    'justifyContent': 'center',
    'alignItems': 'center',
    'width': '300px',
    'height': '100px',
    'position': 'absolute',
    'top': `calc(${btnCoords.topCoord}px + 50px)`,
    'left': `calc(${btnCoords.leftCoord}px + 50px)`,
    'background': 'white',
    'zIndex': '1'
  };

  const hand = {
    'width': '50px',
    'height': '50px',
    'position': 'absolute',
    'top': `calc(${btnCoords.topCoord}px + 25px)`,
    'left': `calc(${btnCoords.leftCoord}px + 50px)`,
    // 'transform': 'translate(-100%, -50%)',
    'background': 'white',
    'display': balloonOrigin === 'Library' ? balloonState : 'none'
  }

  return (
    <article
      id="library"
      style={{
        'flex': '2',
        'overflowY': 'scroll',
        'overflowX': 'hidden'
        // 'position': 'relative'
      }}
    >
      <button
        className="option"
        onClick={() => {
          dispatch(balloonOriginCreator('Library'));
          if (balloonState === 'none') {
            dispatch(balloonStateCreator('flex'));
          } else if (balloonOrigin === 'Library') {
            dispatch(balloonStateCreator('none'));
          }
        }}
        ref={ref}
      >옵션</button>
      <Balloon
        contents={<Options dispatch={dispatch} changeState={libDisplayStateCreator} />}
        display={wrapper}
        style={style}
        hand={hand}
      />
      <ul
        id="contents-lists"
        style={{
          'display': 'flex',
          'width': '100%',
          'flex-wrap': 'wrap'
        }}
      >
        { makeList(userLib, libDisplay) }
      </ul>
      {/* { testBtns(apiAuth, setApiAuth) } */}
    </article>
  );
};

export default Library;