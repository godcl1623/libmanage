/* eslint-disable no-else-return */
import { useState, useEffect } from 'react';
import MainContents from './utils/Main/MainContents';
import OnlineWrapper from './utils/Main/NetworkStatus/OnlineWrapper';
import OfflineWrapper from './utils/Main/NetworkStatus/OfflineWrapper';

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