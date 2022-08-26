/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Balloon = ({contents, display, style, hand}: any) => (
  <article
    id="balloon"
    css={css`
      ${display}
    `}
  >
    <section
      className="balloon-body"
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