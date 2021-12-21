/* @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Link } from 'gatsby';
import slugger from 'github-slugger';
import * as React from 'react';

interface Props {
  headings: [{ depth: number; value: string }];
}

const Toc = ({ headings }: Props) => (
  <div
    css={css`
      margin-top: 15px;
      margin-bottom: 15px;
      background-color: #fafafa;
      border: 2px solid #f0f0f0;
      padding: 10px;
      width: 400px;
      border-radius: 5px;

      a {
        color: black;
      }
    `}
  >
    <ol>
      {headings
        .filter((h) => h.depth === 1)
        .map((h) => (
          <li key={h.value}>
            <Link to={`#${slugger.slug(h.value)}`}>{h.value}</Link>
          </li>
        ))}
    </ol>
  </div>
);

export default Toc;
