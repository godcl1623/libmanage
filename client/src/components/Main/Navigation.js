import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const menu = (value, storeList) => {
  const game = <p>game</p>;
  const music = <p>music</p>;
  const series = <p>series</p>;
  const movie = <p>movie</p>;
  const displayMenu = (...params) => params.map((param, index) => {
    if (storeList[index] !== undefined) {
      return (
        <div key={index}>
          {param}
          <p>- {storeList[index]}</p>
        </div>
      )
    // eslint-disable-next-line no-else-return
    } else {
      return (
        <div key={index}>
          {param}
        </div>
      );
    }
  });
  switch (value) {
    case 'game':
      return displayMenu(game);
    case 'music':
      return displayMenu(music);
    case 'series':
      return displayMenu(series);
    case 'movie':
      return displayMenu(movie);
    default:
      return displayMenu(game, music, series, movie);
  }
};

const Navigation = () => {
  const userState = useSelector(state => state.userState);
  const [selectedMenu, setSelectedMenu] = useState('all');
  const [storesList, setStoresList] = useState('');

  React.useEffect(() => {
    const { stores } = userState;
    if (stores !== undefined) {
      const categories = Object.keys(stores);
      const eachStoresOfCategories = categories.map(ele => Object.keys(stores[ele]));
      const eachStatusOfStoresOfCategories = categories.map(ele => Object.values(stores[ele]));
      const activatedStores = eachStatusOfStoresOfCategories
        .map(storeStat => storeStat
          .map((ele, index) => ele === true ? index : '')
          .filter(ele => ele !== '')
        );
      const storesToDisplay = activatedStores
        .map(
          (status, index) => status.map(iTrue => eachStoresOfCategories[index][iTrue])
        );
      setStoresList(storesToDisplay);
    }
  }, [userState.stores]);


  return (
    <nav
      id="navigation"
      style={{
        'flex': '1'
      }}
    >
      <select
        name="content-type"
        className="dropdown"
        value={selectedMenu}
        onChange={e => setSelectedMenu(e.target.value)}
      >
        <option value="all">전체</option>
        <option value="game">게임</option>
        <option value="music">음악</option>
        <option value="series">드라마</option>
        <option value="movie">영화</option>
      </select>
      {menu(selectedMenu, storesList)}
    </nav>
  );
};

export default Navigation;