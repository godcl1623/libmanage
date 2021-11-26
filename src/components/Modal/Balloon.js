import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Balloon = ({contents, display, style, hand}) => (
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