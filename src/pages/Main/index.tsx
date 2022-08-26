/* eslint-disable no-else-return */
import { useState, useEffect } from 'react';
import MainContents from './components/MainContents';
import OnlineWrapper from './components/Wrappers/OnlineWrapper';
import OfflineWrapper from './components/Wrappers/OfflineWrapper';

const Main = () => {
  const [ isOnline, setIsOnline ] = useState(true);

  useEffect(() => {
    if (navigator.onLine) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, []);

  if (!isOnline) {
    return <OfflineWrapper Contents={ MainContents }/>
  } else {
    return <OnlineWrapper Contents={ MainContents }/>
  }
}

export default Main;