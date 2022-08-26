/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import Routing from 'routing';
import { sizes, flex, border } from '../styles';
import globalStyles from '../styles/global/globalStyles';
import { StyleSet } from '../custom_modules/commonUtils';

const App = () => (
  <div
    id="App"
  >
    <Global styles={css`${globalStyles({ sizes, flex, border } as StyleSet)}`}/>
    <Routing />
  </div>
);

export default App;