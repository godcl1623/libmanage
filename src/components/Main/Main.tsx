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

  // React.useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:3003')
  //   ws.onopen = ev => {
  //     ws.send('client_connected');
  //   }
  //   ws.onmessage = msg => console.log(msg.data)
  //   return () => ws.close();
  // }, [])

  if (!isOnline) {
    return <OfflineWrapper Contents={ MainContents }/>
  } else {
    return <OnlineWrapper Contents={ MainContents }/>
  }
}

export default Main;