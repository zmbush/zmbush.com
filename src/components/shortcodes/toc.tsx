/* @jsx jsx */
import { Link } from 'gatsby';
import slugger from 'github-slugger';

import { jsx, css } from '../../util/emotionReact';
import theme from '../../util/theme';

interface Props {
  headings: [{ depth: number; value: string }];
}

const Toc = ({ headings }: Props) => (
  <div
    className='toc'
    css={css`
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
      background-color: ${theme.colors.divider};
      border: 0.2rem solid ${theme.colors.darken(theme.colors.divider, 20)};
      padding: 1rem;
      max-width: 40rem;
      border-radius: 0.5rem;

      a {
        color: ${theme.colors.text.primary};
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
