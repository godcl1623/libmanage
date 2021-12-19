/* eslint-disable no-else-return */
import React, { memo } from 'react';
import MainContents from './utils/Main/MainContents';
import OnlineWrapper from './utils/Main/NetworkStatus/OnlineWrapper';
import OfflineWrapper from './utils/Main/NetworkStatus/OfflineWrapper';

const MemoedOnline = memo(OnlineWrapper);
const MemoedOffline = memo(OfflineWrapper);

const Main = () => {
  const [ isOnline, setIsOnline ] = React.useState(true);

  React.useEffect(() => {
    if (navigator.onLine) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, []);

  if (!isOnline) {
    return <MemoedOffline Contents={ MainContents }/>
    // return <Offline />
  } else {
    return <MemoedOnline Contents={ MainContents }/>
  }
}

export default Main;