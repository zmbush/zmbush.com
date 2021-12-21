import { css, Global } from '@emotion/react';
import '@fontsource/roboto/latin-300.css';
import 'prism-themes/themes/prism-solarized-dark-atom.css';
import * as React from 'react';
import { Helmet } from 'react-helmet';

const reset = css`
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

const boilerplate = css`
  html {
    font-size: 18px;
  }

  // W3C recommended sizes
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.17rem;
  }
  h4 {
    font-size: 1.12rem;
  }
  h5 {
    font-size: 0.83rem;
  }
  h6 {
    font-size: 0.75rem;
  }

  body {
    font-family: sans-serif;
  }
`;

const base = css`
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }

  .gatsby-highlight-code-line {
    background-color: #024658;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #027e9e;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Base = ({ children }: Props) => (
  <>
    <Global styles={reset} />
    <Global styles={boilerplate} />
    <Global styles={base} />
    <Helmet htmlAttributes={{ lang: 'en' }} />
    {children}
  </>
);

export default Base;
