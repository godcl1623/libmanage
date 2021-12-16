import React from 'react';

// const Offline = ({ children }) => {
//   const [ isOnline, setIsOnline ] = React.useState(true);

//   React.useEffect(() => {
//     window.addEventListener('online', setIsOnline(true));
//     window.addEventListener('offline', setIsOnline(false));

//     return () => {
//       window.removeEventListener('online', setIsOnline(true));
//       window.removeEventListener('offline', setIsOnline(false));
//     }
//   }, []);

//   return (
//     <>
//       <div className="offline" />
//       { children }
//     </>
//   );
// }

const Offline = () => (
  <h1>Offline</h1>
);

export default Offline;