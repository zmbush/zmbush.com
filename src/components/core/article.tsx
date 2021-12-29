/* @jsx jsx */
import * as React from 'react';

import { jsx, css } from '../../util/emotionReact';
import theme from '../../util/theme';

import Default from './default';

interface Props extends Omit<React.ComponentProps<typeof Default>, `className`> {}

const Article = (props: Props) => (
  <Default
    css={css`
      padding-top: 1rem;
      max-width: ${theme.breakpoints.value(`article`)};
      margin: 0 auto;
    `}
    {...props}
  />
);

export default Article;
