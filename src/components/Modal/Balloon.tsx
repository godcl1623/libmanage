import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// props 타입 설정 필요
const Balloon = ({contents, display, style, hand}: any) => (
  <article
    id="balloon"
    // style={display}
    css={css`
      ${display}
    `}
  >
    <section
      className="balloon-body"
      // style={style}
      css={css`
        ${style}
      `}
    >
      {contents}
    </section>
    <div
      className="balloon-hand"
      css={css`
        ${hand}
      `}
    ></div>
  </article>
);

export default Balloon;