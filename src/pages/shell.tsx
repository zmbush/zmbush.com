/* @jsx jsx */
import { jsx, css, Global } from '@emotion/react';

import Base from '../components/base';
import Navbar from '../components/navbar';
import Shell from '../components/shell';

const bg = css`
  html {
    background-color: black;
  }
`;

const ShellPage = () => (
  <Base>
    <Global styles={bg} />
    <Navbar />
    <div
      css={css`
        font-family: 'Roboto Mono', monospace;
        padding: 10px;
        color: #e040fb;
      `}
    >
      <Shell />
    </div>
  </Base>
);

export default ShellPage;
