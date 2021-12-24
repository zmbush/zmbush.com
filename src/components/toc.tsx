/* @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Link } from 'gatsby';
import slugger from 'github-slugger';

interface Props {
  headings: [{ depth: number; value: string }];
}

const Toc = ({ headings }: Props) => (
  <div
    className='toc'
    css={css`
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
      background-color: #fafafa;
      border: 0.2rem solid #f0f0f0;
      padding: 1rem;
      max-width: 40rem;
      border-radius: 0.5rem;

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