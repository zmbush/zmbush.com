/* @jsx jsx */
import Base from '../components/core/base';
import Navbar from '../components/core/navbar';
import Shell from '../components/shell';
import { jsx, css, Global } from '../util/emotionReact';

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
        padding: 1rem;
        color: #e040fb;
      `}
    >
      <Shell />
    </div>
  </Base>
);

export default ShellPage;
