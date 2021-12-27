/* @jsx jsx */
import '@fontsource/roboto/latin-300-italic.css';
import React from 'react';

import { jsx, css } from '../../util/emotionReact';

interface Props {
  children: React.ReactNode;
}

const Caption = ({ children }: Props) => (
  <span
    css={css`
      text-align: center;
      display: block;
      padding-bottom: 2rem;
      margin-top: -5px;
      font-style: italic;
    `}
  >
    {children}
  </span>
);
export default Caption;
