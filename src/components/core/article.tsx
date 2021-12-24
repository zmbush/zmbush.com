/* @jsx jsx */
import { jsx, css } from '@emotion/react';
import * as React from 'react';

import Default from './default';

interface Props extends Omit<React.ComponentProps<typeof Default>, 'className'> {}

const Article = (props: Props) => (
  <Default
    css={css`
      padding-top: 1rem;
      max-width: 75rem;
      margin: 0 auto;
    `}
    {...props}
  />
);

export default Article;