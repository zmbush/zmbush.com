/* @jsx jsx */
import { jsx, css } from '@emotion/react';
import '@fontsource/roboto/latin-300-italic.css';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Caption = ({ children }: Props) => (
  <span
    css={css`
      text-align: center;
      display: block;
      padding-bottom: 20px;
      margin-top: -5px;
      font-style: italic;
    `}
  >
    {children}
  </span>
);
export default Caption;
