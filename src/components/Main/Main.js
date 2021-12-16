/* eslint-disable no-else-return */
import React from 'react';
import MainContents from './utils/Main/MainContents';
import OnlineWrapper from './utils/Main/NetworkStatus/OnlineWrapper';
import OfflineWrapper from './utils/Main/NetworkStatus/OfflineWrapper';
import Offline from '../Offline';

const Main = () => {
  const [ isOnline, setIsOnline ] = React.useState(true);

  React.useEffect(() => {
    if (navigator.onLine) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
    // window.addEventListener('online', setIsOnline(true));
    // window.addEventListener('offline', setIsOnline(false));
    // return (() => {
    //   window.removeEventListener('online', setIsOnline(true));
    //   window.removeEventListener('offline', setIsOnline(false));
    // });
  }, []);

  if (!isOnline) {
    return <OfflineWrapper Contents={ MainContents }/>
    // return <Offline />
  } else {
    return <OnlineWrapper Contents={ MainContents }/>
  }
}

export default Main;